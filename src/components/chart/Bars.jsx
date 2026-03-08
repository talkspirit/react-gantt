import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { locate, locateID } from '@svar-ui/lib-dom';
import { getID } from '../../helpers/locate';
import storeContext from '../../context';
import { useStore, useStoreWithCounter } from '@svar-ui/lib-react';
import { isSegmentMoveAllowed, extendDragOptions } from '@svar-ui/gantt-store';
import { Button } from '@svar-ui/react-core';
import Links from './Links.jsx';
import BarSegments from './BarSegments.jsx';
import './Bars.css';

// Module-level clipboard (persists across renders, used by copy-paste feature)
let clipboardTasks = [];
let clipboardBaseDate = null;
let clipboardParent = null;

// Check if two horizontal bounds overlap (AABB collision)
const boundsOverlap = (left1, right1, left2, right2) => {
  return left1 < right2 && right1 > left2;
};

const pixelToDate = (px, scales) => {
  if (!scales || !scales.start) return null;
  const { start, lengthUnitWidth, lengthUnit } = scales;
  const msPerDay = 86400000;
  const daysPerUnit =
    lengthUnit === 'week'
      ? 7
      : lengthUnit === 'month'
        ? 30
        : lengthUnit === 'quarter'
          ? 91
          : lengthUnit === 'year'
            ? 365
            : 1;
  const units = Math.floor(px / lengthUnitWidth);
  const date = new Date(start.getTime() + units * daysPerUnit * msPerDay);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const getCellOffset = (date, baseDate, scales) => {
  if (!scales || !date || !baseDate) return 0;
  const { lengthUnit } = scales;
  const msPerDay = 86400000;
  const daysPerUnit =
    lengthUnit === 'week'
      ? 7
      : lengthUnit === 'month'
        ? 30
        : lengthUnit === 'quarter'
          ? 91
          : lengthUnit === 'year'
            ? 365
            : 1;
  const msPerUnit = daysPerUnit * msPerDay;
  return Math.round((date.getTime() - baseDate.getTime()) / msPerUnit);
};

const addCells = (date, cells, scales) => {
  if (!scales || !date) return date;
  const { lengthUnit } = scales;
  const msPerDay = 86400000;
  const daysPerUnit =
    lengthUnit === 'week'
      ? 7
      : lengthUnit === 'month'
        ? 30
        : lengthUnit === 'quarter'
          ? 91
          : lengthUnit === 'year'
            ? 365
            : 1;
  const msPerUnit = daysPerUnit * msPerDay;
  const result = new Date(date.getTime() + cells * msPerUnit);
  result.setUTCHours(0, 0, 0, 0);
  return result;
};

function Bars(props) {
  const {
    readonly,
    taskTemplate: TaskTemplate,
    multiTaskRows = false,
    rowMapping = null,
    rowHeightOverrides = null,
    allowTaskIntersection = true,
    summaryBarCounts = false,
    marqueeSelect = false,
    copyPaste = false,
    linkShape,
    linkGradient = false,
    linkStyle,
    linkBundling = false,
    showProgress = true,
  } = props;

  const api = useContext(storeContext);

  const [rTasksValue, rTasksCounter] = useStoreWithCounter(api, '_tasks');
  const [rLinksValue, rLinksCounter] = useStoreWithCounter(api, '_links');
  const areaValue = useStore(api, 'area');
  const scalesValue = useStore(api, '_scales');
  const taskTypesValue = useStore(api, 'taskTypes');
  const baselinesValue = useStore(api, 'baselines');
  const selectedValue = useStore(api, '_selected');
  const scrollTaskStore = useStore(api, '_scrollTask');
  const criticalPath = useStore(api, 'criticalPath');
  const tree = useStore(api, 'tasks');
  const schedule = useStore(api, 'schedule');
  const splitTasks = useStore(api, 'splitTasks');
  const summary = useStore(api, 'summary');

  const tasks = useMemo(() => {
    if (!areaValue || !Array.isArray(rTasksValue)) return [];
    const start = areaValue.start ?? 0;
    const end = areaValue.end ?? 0;

    // When multiTaskRows is enabled, include all tasks (store area doesn't
    // account for reduced row count). Container height is already correct.
    if (multiTaskRows && rowMapping) {
      return rTasksValue.map((a) => ({ ...a }));
    }

    return rTasksValue.slice(start, end).map((a) => ({ ...a }));
  }, [rTasksCounter, areaValue, multiTaskRows, rowMapping]);

  // Adjust task $y positions for multiTaskRows
  const cellHeight = useStore(api, 'cellHeight');
  const adjustedTasks = useMemo(() => {
    if (!multiTaskRows || !rowMapping || !tasks.length) return tasks;

    // Build rowId to rowIndex map
    const rowIndexMap = new Map();
    const seenRows = [];

    rTasksValue.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!rowIndexMap.has(rowId)) {
        rowIndexMap.set(rowId, seenRows.length);
        seenRows.push(rowId);
      }
    });

    // Group NON-SUMMARY tasks per row for lane-packing.
    // Summary rows sharing a visual row with tasks are hidden ($skip),
    // so they must not occupy a lane.
    const rowTasks = new Map(); // rowId -> task[]
    tasks.forEach((task) => {
      if (task.type === 'summary') return;
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!rowTasks.has(rowId)) rowTasks.set(rowId, []);
      rowTasks.get(rowId).push(task);
    });

    // Assign each task to the lowest lane where it doesn't overlap
    // with existing tasks (interval packing using $x / $w pixel bounds).
    const taskLane = new Map(); // taskId -> lane index
    const rowLaneCounts = new Map(); // rowId -> number of lanes
    rowTasks.forEach((tasksInRow, rowId) => {
      // lanes[i] = array of tasks placed in lane i
      const lanes = [];
      // Sort by horizontal start so greedy first-fit works well
      const sorted = [...tasksInRow].sort((a, b) => (a.$x ?? 0) - (b.$x ?? 0));
      for (const t of sorted) {
        const tLeft = t.$x ?? 0;
        const tRight = tLeft + (t.$w ?? 0);
        let placed = false;
        for (let li = 0; li < lanes.length; li++) {
          // Check if task overlaps any existing task in this lane
          const conflict = lanes[li].some((existing) => {
            const eLeft = existing.$x ?? 0;
            const eRight = eLeft + (existing.$w ?? 0);
            return boundsOverlap(tLeft, tRight, eLeft, eRight);
          });
          if (!conflict) {
            lanes[li].push(t);
            taskLane.set(t.id, li);
            placed = true;
            break;
          }
        }
        if (!placed) {
          lanes.push([t]);
          taskLane.set(t.id, lanes.length - 1);
        }
      }
      rowLaneCounts.set(rowId, lanes.length);
    });

    // Compute cumulative Y offset using rowHeightOverrides
    const rowYOffsets = new Map();
    let cumulativeY = 0;
    for (const rowId of seenRows) {
      rowYOffsets.set(rowId, cumulativeY);
      const rowH =
        (rowHeightOverrides && rowHeightOverrides[rowId]) || cellHeight;
      cumulativeY += rowH;
    }

    // Position tasks using lane assignments.
    // For non-stacked rows, preserve vertical centering that SVAR normally applies
    // (bar is centered within cellHeight via a small vertical padding).
    return tasks.map((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      const baseY = rowYOffsets.get(rowId) ?? 0;

      // Hide summary bars that share a row with child tasks —
      // the individual task bars replace the summary visually.
      // Also hide bars explicitly marked with barHidden.
      if (task.type === 'summary') {
        const childCount = (rowTasks.get(rowId) || []).length;
        if (childCount > 0 || task.barHidden) {
          return { ...task, $y: baseY, $skip: true };
        }
        // Vertically center within the row
        const rowH =
          (rowHeightOverrides && rowHeightOverrides[rowId]) || cellHeight;
        const vPad = Math.max(0, Math.floor((rowH - task.$h) / 2));
        return {
          ...task,
          $y: baseY + vPad,
          $y_base: task.$y_base !== undefined ? baseY + vPad : undefined,
        };
      }

      const laneCount = rowLaneCounts.get(rowId) || 1;
      const lane = taskLane.get(task.id) ?? 0;

      if (laneCount > 1) {
        // Keep original bar height — stack with spacing between lanes.
        // Each lane slot = barHeight + gap, with outer margin top/bottom.
        const gap = 4;
        const outerMargin = 3;
        const slotH = task.$h + gap;
        const y = baseY + outerMargin + lane * slotH;
        return {
          ...task,
          $y: y,
          $y_base: task.$y_base !== undefined ? y : undefined,
        };
      }
      // Single lane — center vertically like SVAR normally does.
      // Use Math.round to match SVAR's native centering as closely as possible.
      const rowH =
        (rowHeightOverrides && rowHeightOverrides[rowId]) || cellHeight;
      const vPad = Math.max(0, Math.round((rowH - task.$h) / 2));
      return {
        ...task,
        $y: baseY + vPad,
        $y_base: task.$y_base !== undefined ? baseY + vPad : undefined,
      };
    });
  }, [
    tasks,
    multiTaskRows,
    rowMapping,
    rTasksValue,
    cellHeight,
    rowHeightOverrides,
  ]);

  // Build task position map for Links Y-adjustment in multiTaskRows mode.
  // Maps task.id → { y, h } using the final bar positions from adjustedTasks.
  const taskPositions = useMemo(() => {
    if (!multiTaskRows || !adjustedTasks?.length) return null;
    const m = new Map();
    for (const t of adjustedTasks) {
      if (!t.$skip) m.set(t.id, { y: t.$y, h: t.$h });
    }
    return m;
  }, [multiTaskRows, adjustedTasks]);

  const lengthUnitWidth = useMemo(
    () => scalesValue.lengthUnitWidth,
    [scalesValue],
  );

  const lengthUnit = useMemo(
    () => scalesValue.lengthUnit || 'day',
    [scalesValue],
  );

  // ── Collision Detection ──────────────────────────────────────────
  const overlappingTaskIds = useMemo(() => {
    const overlapping = new Set();
    if (allowTaskIntersection || !multiTaskRows || !rowMapping) {
      return overlapping;
    }

    const tasksByRow = new Map();
    rTasksValue.forEach((task) => {
      if (task.type === 'summary' || task.type === 'milestone') return;
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!tasksByRow.has(rowId)) {
        tasksByRow.set(rowId, []);
      }
      tasksByRow.get(rowId).push(task);
    });

    tasksByRow.forEach((rowTasks) => {
      if (rowTasks.length < 2) return;
      for (let i = 0; i < rowTasks.length; i++) {
        for (let j = i + 1; j < rowTasks.length; j++) {
          const task1 = rowTasks[i];
          const task2 = rowTasks[j];
          if (
            boundsOverlap(
              task1.$x,
              task1.$x + task1.$w,
              task2.$x,
              task2.$x + task2.$w,
            )
          ) {
            overlapping.add(task1.id);
            overlapping.add(task2.id);
          }
        }
      }
    });

    return overlapping;
  }, [
    allowTaskIntersection,
    multiTaskRows,
    rowMapping,
    rTasksValue,
    rTasksCounter,
  ]);

  // ── Summary Bar Counts ──────────────────────────────────────────
  const summaryColCounts = useMemo(() => {
    if (!summaryBarCounts || !rTasksValue?.length || !lengthUnitWidth)
      return null;

    const childrenMap = new Map();
    const summaryIds = new Set();
    rTasksValue.forEach((task) => {
      if (task.type === 'summary') {
        summaryIds.add(task.id);
      }
      if (task.parent && task.parent !== 0 && task.type !== 'summary') {
        if (!childrenMap.has(task.parent)) {
          childrenMap.set(task.parent, []);
        }
        childrenMap.get(task.parent).push(task);
      }
    });

    const counts = new Map();
    summaryIds.forEach((summaryId) => {
      const children = childrenMap.get(summaryId);
      if (!children?.length) return;

      const colCounts = new Map();
      children.forEach((child) => {
        if (child.$x == null || child.$w == null) return;
        const startCol = Math.floor(child.$x / lengthUnitWidth);
        const endCol = Math.ceil((child.$x + child.$w) / lengthUnitWidth);
        for (let col = startCol; col < endCol; col++) {
          colCounts.set(col, (colCounts.get(col) || 0) + 1);
        }
      });

      if (colCounts.size > 0) {
        counts.set(summaryId, colCounts);
      }
    });

    return counts;
  }, [summaryBarCounts, rTasksValue, lengthUnitWidth]);

  // ── Marquee Selection State ─────────────────────────────────────
  const [marquee, setMarquee] = useState(null);
  const marqueeRef = useRef(null);
  const [bulkMove, setBulkMove] = useState(null);

  // ── Copy-Paste State ────────────────────────────────────────────
  const [pastePreview, setPastePreview] = useState(null);
  const [pasteTargetDate, setPasteTargetDate] = useState(null);
  const pasteTargetDateRef = useRef(null);
  pasteTargetDateRef.current = pasteTargetDate;
  const lastMouseXRef = useRef(0);

  const ignoreNextClickRef = useRef(false);

  const [linkFrom, setLinkFrom] = useState(undefined);
  const linkFromRef = useRef(null);
  const linkDragStartRef = useRef(null); // { clientX, clientY } initial mousedown
  const linkDragActiveRef = useRef(false); // true once drag threshold exceeded
  const linkDragRef = useRef(null); // { x, y } cursor position during link drag
  const [linkDragPos, setLinkDragPos] = useState(null);
  const [taskMove, setTaskMove] = useState(null);
  const progressFromRef = useRef(null);

  const [selectedLinkId, setSelectedLinkId] = useState(null);

  const selectedLink = useMemo(() => {
    return (
      selectedLinkId && {
        ...rLinksValue.find((link) => link.id === selectedLinkId),
      }
    );
  }, [selectedLinkId, rLinksCounter]);

  const [touched, setTouched] = useState(undefined);
  const touchTimerRef = useRef(null);

  const [totalWidth, setTotalWidth] = useState(0);

  const containerRef = useRef(null);

  const hasFocus = useMemo(() => {
    const el = containerRef.current;
    return !!(
      selectedValue.length &&
      el &&
      el.contains(document.activeElement)
    );
  }, [selectedValue, containerRef.current]);

  const focused = useMemo(() => {
    return hasFocus && selectedValue[selectedValue.length - 1]?.id;
  }, [hasFocus, selectedValue]);

  useEffect(() => {
    if (!scrollTaskStore) return;
    if (hasFocus && scrollTaskStore) {
      const { id } = scrollTaskStore;
      const node = containerRef.current?.querySelector(
        `.wx-bar[data-id='${id}']`,
      );
      if (node) node.focus({ preventScroll: true });
    }
  }, [scrollTaskStore]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setTotalWidth(el.offsetWidth || 0);
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]) {
          setTotalWidth(entries[0].contentRect.width);
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, [containerRef.current]);

  const startDrag = useCallback(() => {
    document.body.style.userSelect = 'none';
  }, []);

  const endDrag = useCallback(() => {
    document.body.style.userSelect = '';
  }, []);

  // ── Marquee: compute adjusted Y positions for intersection test ──
  const taskYPositions = useMemo(() => {
    if (!multiTaskRows || !rowMapping || !rTasksValue?.length) return new Map();
    const yMap = new Map();
    const rowIndexMap = new Map();
    const seenRows = [];
    rTasksValue.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!rowIndexMap.has(rowId)) {
        rowIndexMap.set(rowId, seenRows.length);
        seenRows.push(rowId);
      }
    });
    rTasksValue.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      const rowIndex = rowIndexMap.get(rowId) ?? 0;
      yMap.set(task.id, rowIndex * cellHeight);
    });
    return yMap;
  }, [rTasksValue, multiTaskRows, rowMapping, cellHeight]);

  // Compute row Y positions map (for paste preview ghost placement)
  const rowYPositions = useMemo(() => {
    if (!multiTaskRows || !rowMapping || !rTasksValue?.length) return new Map();
    const yMap = new Map();
    const rowIndexMap = new Map();
    const seenRows = [];
    rTasksValue.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!rowIndexMap.has(rowId)) {
        rowIndexMap.set(rowId, seenRows.length);
        seenRows.push(rowId);
      }
    });
    rTasksValue.forEach((task) => {
      const row = task.row ?? task.id;
      if (!yMap.has(row)) {
        const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
        const rowIndex = rowIndexMap.get(rowId) ?? 0;
        yMap.set(row, rowIndex * cellHeight);
      }
    });
    return yMap;
  }, [rTasksValue, multiTaskRows, rowMapping, cellHeight]);

  // ── Marquee: getIntersectingTasks ──
  const getIntersectingTasks = useCallback(
    (rect) => {
      if (!containerRef.current) return [];
      const minX = Math.min(rect.startX, rect.currentX);
      const maxX = Math.max(rect.startX, rect.currentX);
      const minY = Math.min(rect.startY, rect.currentY);
      const maxY = Math.max(rect.startY, rect.currentY);

      return rTasksValue.filter((task) => {
        const taskLeft = task.$x;
        const taskRight = task.$x + task.$w;
        const taskAbsoluteY = taskYPositions.get(task.id) ?? task.$y;
        const taskTop = taskAbsoluteY;
        const taskBottom = taskTop + task.$h;
        return (
          taskLeft < maxX &&
          taskRight > minX &&
          taskTop < maxY &&
          taskBottom > minY
        );
      });
    },
    [rTasksValue, taskYPositions],
  );

  // ── Copy-Paste: handleCopy ──
  const handleCopy = useCallback(() => {
    if (!copyPaste) return;
    const selected = api.getState()._selected;
    if (!selected || !selected.length) return;

    const msPerDay = 86400000;
    const copiedTasks = selected
      .map((sel) => {
        const task = api.getTask(sel.id);
        if (!task) return null;
        const renderedTask = rTasksValue.find((t) => t.id === sel.id);
        if (!renderedTask) return null;
        // eslint-disable-next-line no-unused-vars
        const { $x, $y, $h, $w, $skip, $level, ...clean } = renderedTask;
        const durationDays =
          renderedTask.end && renderedTask.start
            ? Math.round(
                (renderedTask.end.getTime() - renderedTask.start.getTime()) /
                  msPerDay,
              )
            : 0;
        const startDayOfWeek = renderedTask.start
          ? (renderedTask.start.getUTCDay() + 6) % 7
          : 0;
        return {
          ...clean,
          _durationDays: durationDays,
          _startDayOfWeek: startDayOfWeek,
          _originalWidth: $w,
          _originalHeight: $h,
        };
      })
      .filter(Boolean);

    if (!copiedTasks.length) return;

    const firstTask = copiedTasks[0];
    const commonParent = firstTask.parent;
    const validTasks = copiedTasks.filter((t) => t.parent === commonParent);
    if (validTasks.length === 0) return;

    const baseDate = validTasks.reduce((min, t) => {
      if (!t.start) return min;
      return !min || t.start < min ? t.start : min;
    }, null);

    clipboardTasks = validTasks.map((t) => ({
      ...t,
      _startCellOffset: getCellOffset(t.start, baseDate, scalesValue),
    }));
    clipboardParent = commonParent;
    clipboardBaseDate = baseDate;
  }, [copyPaste, api, rTasksValue, scalesValue]);

  // ── Copy-Paste: runPaste ──
  const runPaste = useCallback(
    (targetDate, pastedTasks, parent) => {
      if (!pastedTasks.length || !targetDate) return;
      if (parent === undefined || parent === null) return;

      const msPerDay = 86400000;
      const history = api.getHistory();
      history?.startBatch();

      const targetColumnStart = new Date(targetDate);
      targetColumnStart.setUTCHours(0, 0, 0, 0);

      pastedTasks.forEach((task, i) => {
        const newId = `task-${Date.now()}-${i}`;
        const cellOffset = addCells(
          targetColumnStart,
          task._startCellOffset || 0,
          scalesValue,
        );
        const newStart = new Date(
          cellOffset.getTime() + (task._startDayOfWeek || 0) * msPerDay,
        );
        newStart.setUTCHours(0, 0, 0, 0);
        const newEnd = new Date(
          newStart.getTime() + (task._durationDays || 7) * msPerDay,
        );
        newEnd.setUTCHours(0, 0, 0, 0);

        api.exec('add-task', {
          task: {
            id: newId,
            text: task.text,
            start: newStart,
            end: newEnd,
            type: task.type || 'task',
            parent: parent,
            row: task.row,
          },
          target: parent,
          mode: 'child',
          skipUndo: i > 0,
        });
      });

      history?.endBatch();
    },
    [api, scalesValue],
  );

  // ── Copy-Paste: hotkey intercept (Ctrl+C / Ctrl+V) ──
  useEffect(() => {
    if (!copyPaste) return;

    const unsub = api.intercept('hotkey', (ev) => {
      if (ev.key === 'ctrl+c' || ev.key === 'meta+c') {
        handleCopy();
        return false;
      }
      if (ev.key === 'ctrl+v' || ev.key === 'meta+v') {
        if (!clipboardTasks.length || !clipboardBaseDate) return false;
        setPastePreview({
          tasks: clipboardTasks,
          baseDate: clipboardBaseDate,
          parent: clipboardParent,
          currentX: lastMouseXRef.current,
        });
        return false;
      }
    });
    return unsub;
  }, [copyPaste, api, handleCopy]);

  // Escape key to cancel paste preview
  useEffect(() => {
    if (!pastePreview) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setPastePreview(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [pastePreview]);

  const getMoveMode = useCallback(
    (node, e, task) => {
      if (e.target.classList.contains('wx-line')) return '';
      if (!task) task = api.getTask(getID(node));
      if (task.type === 'milestone' || task.type === 'summary') return '';

      const segmentNode = locate(e, 'data-segment');
      if (segmentNode) node = segmentNode;

      const { left, width } = node.getBoundingClientRect();
      const p = (e.clientX - left) / width;
      let delta = 0.2 / (width > 200 ? width / 200 : 1);
      if (p < delta) return 'start';
      if (p > 1 - delta) return 'end';
      return '';
    },
    [api],
  );

  const down = useCallback(
    (node, point) => {
      const { clientX } = point;
      const id = getID(node);
      const task = api.getTask(id);
      const css = point.target.classList;
      if (point.target.closest('.wx-delete-button')) return;
      if (point.target.closest('[data-interactive]')) return;
      if (css.contains('wx-link') || point.target.closest('.wx-link')) return;
      if (!readonly) {
        if (css.contains('wx-progress-marker')) {
          const { progress } = api.getTask(id);
          progressFromRef.current = {
            id,
            x: clientX,
            progress,
            dx: 0,
            node,
            marker: point.target,
          };
          point.target.classList.add('wx-progress-in-drag');
        } else {
          const mode = getMoveMode(node, point, task) || 'move';

          const newTaskMove = {
            id,
            mode,
            x: clientX,
            dx: 0,
            l: task.$x,
            w: task.$w,
          };

          if (splitTasks && task.segments?.length) {
            const segNode = locate(point, 'data-segment');
            if (segNode) {
              newTaskMove.segmentIndex = segNode.dataset['segment'] * 1;
              extendDragOptions(task, newTaskMove);
            }
          }

          setTaskMove(newTaskMove);
        }
        startDrag();
      }
    },
    [api, readonly, getMoveMode, startDrag, splitTasks],
  );

  const mousedown = useCallback(
    (e) => {
      if (e.button !== 0) return;

      // Skip mousedown processing when in paste preview mode
      if (pastePreview) return;

      const node = locate(e);

      // Marquee selection: click on empty space
      if (!node && marqueeSelect && !readonly) {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();

        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        if (copyPaste) {
          const clickDate = pixelToDate(startX, scalesValue);
          if (clickDate) {
            pasteTargetDateRef.current = clickDate;
            setPasteTargetDate(clickDate);
          }
        }

        const marqueeData = {
          startX,
          startY,
          currentX: startX,
          currentY: startY,
          ctrlKey: e.ctrlKey || e.metaKey,
        };
        setMarquee(marqueeData);
        marqueeRef.current = marqueeData;
        startDrag();
        return;
      }

      // Bulk move: drag one of the selected tasks to move all of them
      if (node && marqueeSelect && !readonly && selectedValue.length > 1) {
        const id = getID(node);
        const isSelected = selectedValue.some((s) => s.id === id);
        if (isSelected) {
          setBulkMove({
            startX: e.clientX,
            ids: selectedValue.map((s) => s.id),
            tasks: selectedValue.map((s) => {
              const t = api.getTask(s.id);
              return {
                id: s.id,
                start: t.start,
                end: t.end,
                $x: t.$x,
                $w: t.$w,
              };
            }),
          });
          startDrag();
          return;
        }
      }

      // Link handle interaction
      if (!readonly && (e.target.classList.contains('wx-link') || e.target.classList.contains('wx-inner'))) {
        // If linkFrom is already set, we're in click-based flow waiting for
        // the second click — return early so onClick handles it (don't start
        // a task drag via down()).
        if (linkFromRef.current) return;

        const linkEl = e.target.classList.contains('wx-link')
          ? e.target
          : e.target.closest('.wx-link');
        if (linkEl) {
          const id = locateID(linkEl);
          if (id) {
            const toStart = linkEl.classList.contains('wx-left');
            const lf = { id, start: toStart };
            setLinkFrom(lf);
            linkFromRef.current = lf;
            linkDragStartRef.current = { clientX: e.clientX, clientY: e.clientY };
            linkDragActiveRef.current = false;
            // Skip the click event from this mousedown — linkFrom is already
            // set via state; without this, onClick sees linkFrom as set and
            // treats it as a second click on the same handle, clearing it.
            ignoreNextClickRef.current = true;
            startDrag();
            return;
          }
        }
      }

      if (!node) return;

      down(node, e);
    },
    [
      down,
      marqueeSelect,
      copyPaste,
      readonly,
      pastePreview,
      scalesValue,
      selectedValue,
      api,
      startDrag,
    ],
  );

  const touchstart = useCallback(
    (e) => {
      const node = locate(e);
      if (node) {
        touchTimerRef.current = setTimeout(() => {
          setTouched(true);
          down(node, e.touches[0]);
        }, 300);
      }
    },
    [down],
  );

  const types = ['e2s', 's2s', 'e2e', 's2e'];
  const getLinkType = useCallback((fromStart, toStart) => {
    return types[(fromStart ? 1 : 0) + (toStart ? 0 : 2)];
  }, []);

  const alreadyLinked = useCallback(
    (target, toStart) => {
      const source = linkFrom.id;
      const fromStart = linkFrom.start;

      if (target === source) return true;

      return !!rLinksValue.find((l) => {
        return (
          l.target == target &&
          l.source == source &&
          l.type === getLinkType(fromStart, toStart)
        );
      });
    },
    [linkFrom, rLinksCounter, getLinkType],
  );

  const onSelectLink = useCallback((id) => {
    setSelectedLinkId(id);
  }, []);

  const up = useCallback((e) => {
    // Handle link handle mouseup
    if (linkDragStartRef.current) {
      const wasDragging = linkDragActiveRef.current;
      linkDragStartRef.current = null;
      linkDragActiveRef.current = false;
      linkDragRef.current = null;
      setLinkDragPos(null);
      endDrag();

      if (wasDragging) {
        // Drag completed: find target under cursor and create link
        const lf = linkFromRef.current;
        const point = e || window.event;
        const el = point
          ? document.elementFromPoint(point.clientX, point.clientY)
          : null;
        if (el && lf) {
          const linkEl = el.classList.contains('wx-link')
            ? el
            : el.closest('.wx-link');
          if (linkEl) {
            const targetId = locateID(linkEl);
            const toStart = linkEl.classList.contains('wx-left');
            if (targetId && targetId !== lf.id) {
              const linkType = getLinkType(lf.start, toStart);
              const isDuplicate = rLinksValue.find(
                (l) =>
                  l.target == targetId &&
                  l.source == lf.id &&
                  l.type === linkType,
              );
              if (!isDuplicate) {
                api.exec('add-link', {
                  link: {
                    source: lf.id,
                    target: targetId,
                    type: linkType,
                  },
                });
              }
            }
          }
        }
        // Clear link source after drag
        setLinkFrom(null);
        linkFromRef.current = null;
        ignoreNextClickRef.current = true;
      }
      // If not dragging: keep linkFrom active for click-based flow
      return;
    }

    // Handle marquee selection finalization
    const currentMarquee = marqueeRef.current;
    if (currentMarquee) {
      const intersecting = getIntersectingTasks(currentMarquee);

      if (currentMarquee.ctrlKey) {
        intersecting.forEach((task) => {
          api.exec('select-task', { id: task.id, toggle: true, marquee: true });
        });
      } else {
        if (selectedValue.length > 0) {
          api.exec('select-task', { id: null, marquee: true });
        }
        intersecting.forEach((task, index) => {
          api.exec('select-task', {
            id: task.id,
            toggle: index > 0,
            marquee: true,
          });
        });
      }

      setMarquee(null);
      marqueeRef.current = null;
      endDrag();
      ignoreNextClickRef.current = true;
      return;
    }

    // Handle bulk move finalization
    if (bulkMove) {
      // eslint-disable-next-line no-unused-vars
      const { ids, tasks: origTasks, startX } = bulkMove;
      setBulkMove(null);
      endDrag();
      // If there was actual movement, we would update tasks here
      // For now just end the drag
      ignoreNextClickRef.current = true;
      return;
    }

    if (progressFromRef.current) {
      const { dx, id, marker, value } = progressFromRef.current;
      progressFromRef.current = null;
      if (typeof value != 'undefined' && dx)
        api.exec('update-task', {
          id,
          task: { progress: value },
          inProgress: false,
        });
      marker.classList.remove('wx-progress-in-drag');

      ignoreNextClickRef.current = true;
      endDrag();
    } else if (taskMove) {
      const { id, mode, dx, l, w, start, segment, index } = taskMove;
      setTaskMove(null);
      if (start) {
        const diff = Math.round(dx / lengthUnitWidth);

        if (!diff) {
          api.exec('drag-task', {
            id,
            width: w,
            left: l,
            inProgress: false,
            ...(segment && { segmentIndex: index }),
          });
        } else {
          let update = {};
          let task = api.getTask(id);
          if (segment) task = task.segments[index];

          // Calculate new dates directly instead of relying on store diff
          const msPerDay = 24 * 60 * 60 * 1000;
          const daysPerUnit =
            lengthUnit === 'week'
              ? 7
              : lengthUnit === 'month'
                ? 30
                : lengthUnit === 'quarter'
                  ? 91
                  : lengthUnit === 'year'
                    ? 365
                    : 1;
          const diffMs = diff * daysPerUnit * msPerDay;

          if (mode === 'move') {
            update.start = new Date(task.start.getTime() + diffMs);
            update.end = new Date(task.end.getTime() + diffMs);
          } else if (mode === 'start') {
            update.start = new Date(task.start.getTime() + diffMs);
            update.end = task.end;
          } else if (mode === 'end') {
            update.start = task.start;
            update.end = new Date(task.end.getTime() + diffMs);
          }

          api.exec('update-task', {
            id,
            task: update,
            ...(segment && { segmentIndex: index }),
          });
        }
        ignoreNextClickRef.current = true;
      }

      endDrag();
    }
  }, [api, endDrag, taskMove, lengthUnitWidth, lengthUnit, getLinkType, rLinksValue]);

  const move = useCallback(
    (e, point) => {
      const { clientX } = point;

      // Link drag: activate after 5px threshold, then track cursor
      if (linkDragStartRef.current && containerRef.current) {
        const ds = linkDragStartRef.current;
        const dx = clientX - ds.clientX;
        const dy = point.clientY - ds.clientY;
        if (!linkDragActiveRef.current) {
          if (Math.abs(dx) + Math.abs(dy) < 5) return; // below threshold
          linkDragActiveRef.current = true;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const pos = { x: clientX - rect.left, y: point.clientY - rect.top };
        linkDragRef.current = pos;
        setLinkDragPos(pos);
        return;
      }

      // Track mouse position for copy-paste feature
      if (copyPaste && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        lastMouseXRef.current = clientX - rect.left;
      }

      // Update paste preview position
      if (pastePreview && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPastePreview((prev) =>
          prev ? { ...prev, currentX: clientX - rect.left } : null,
        );
      }

      // Handle marquee selection drag
      if (marquee) {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();

        const currentX = clientX - rect.left;
        const currentY = point.clientY - rect.top;

        setMarquee((prev) => ({
          ...prev,
          currentX,
          currentY,
        }));
        if (marqueeRef.current) {
          marqueeRef.current.currentX = currentX;
          marqueeRef.current.currentY = currentY;
        }
        return;
      }

      if (!readonly) {
        if (progressFromRef.current) {
          const { node, x, id } = progressFromRef.current;
          const dx = (progressFromRef.current.dx = clientX - x);

          const diff = Math.round((dx / node.offsetWidth) * 100);
          let progress = progressFromRef.current.progress + diff;
          progressFromRef.current.value = progress = Math.min(
            Math.max(0, progress),
            100,
          );

          api.exec('update-task', {
            id,
            task: { progress },
            inProgress: true,
          });
        } else if (taskMove) {
          onSelectLink(null);
          const { mode, l, w, x, id, start, segment, index } = taskMove;
          const task = api.getTask(id);
          const dx = clientX - x;
          const minWidth = Math.round(lengthUnitWidth) || 1;
          if (
            (!start && Math.abs(dx) < 20) ||
            (mode === 'start' && w - dx < minWidth) ||
            (mode === 'end' && w + dx < minWidth) ||
            (mode === 'move' &&
              ((dx < 0 && l + dx < 0) ||
                (dx > 0 && l + w + dx > totalWidth))) ||
            (taskMove.segment && !isSegmentMoveAllowed(task, taskMove))
          )
            return;

          const nextTaskMove = { ...taskMove, dx };

          let left, width;
          if (mode === 'start') {
            left = l + dx;
            width = w - dx;
          } else if (mode === 'end') {
            left = l;
            width = w + dx;
          } else if (mode === 'move') {
            left = l + dx;
            width = w;
          }

          api.exec('drag-task', {
            id,
            width: width,
            left: left,
            inProgress: true,
            start,
            ...(segment && { segmentIndex: index }),
          });

          if (
            !nextTaskMove.start &&
            ((mode === 'move' && task.$x == l) ||
              (mode !== 'move' && task.$w == w))
          ) {
            ignoreNextClickRef.current = true;
            up();
            return;
          }
          nextTaskMove.start = true;
          setTaskMove(nextTaskMove);
        } else {
          const taskNode = locate(e);
          if (taskNode) {
            const task = api.getTask(getID(taskNode));
            const segNode = locate(e, 'data-segment');
            const barNode = segNode || taskNode;
            const mode = getMoveMode(barNode, point, task);
            barNode.style.cursor = mode && !readonly ? 'col-resize' : 'pointer';
          }
        }
      }
    },
    [
      api,
      readonly,
      taskMove,
      lengthUnitWidth,
      totalWidth,
      getMoveMode,
      onSelectLink,
      up,
    ],
  );

  const mousemove = useCallback(
    (e) => {
      move(e, e);
    },
    [move],
  );

  const touchmove = useCallback(
    (e) => {
      if (touched) {
        e.preventDefault();
        move(e, e.touches[0]);
      } else if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
    },
    [touched, move],
  );

  const mouseup = useCallback((e) => {
    up(e);
  }, [up]);

  const touchend = useCallback((e) => {
    setTouched(null);
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
    up(e);
  }, [up]);

  useEffect(() => {
    window.addEventListener('mouseup', mouseup);
    return () => {
      window.removeEventListener('mouseup', mouseup);
    };
  }, [mouseup]);

  const onDblClick = useCallback(
    (e) => {
      if (!readonly) {
        if (e.target.closest('[data-interactive]')) return;
        const id = locateID(e.target);
        if (id && !e.target.classList.contains('wx-link')) {
          const segmentIndex = locateID(e.target, 'data-segment');
          api.exec('show-editor', {
            id,
            ...(segmentIndex !== null && { segmentIndex }),
          });
        }
      }
    },
    [api, readonly],
  );

  const removeLinkMarker = useCallback(() => {
    if (linkFrom) {
      setLinkFrom(null);
      linkFromRef.current = null;
    }
  }, [linkFrom]);

  const onClick = useCallback(
    (e) => {
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        return;
      }

      // Handle paste preview confirm on click
      if (pastePreview && pastePreview.currentX != null) {
        const targetDate = pixelToDate(pastePreview.currentX, scalesValue);
        if (targetDate) {
          runPaste(targetDate, pastePreview.tasks, pastePreview.parent);
        }
        setPastePreview(null);
        return;
      }

      if (e.target.closest('[data-interactive]')) return;

      const id = locateID(e.target);
      if (id) {
        const css = e.target.classList;
        if (css.contains('wx-link')) {
          const toStart = css.contains('wx-left');
          if (!linkFrom) {
            const lf = { id, start: toStart };
            setLinkFrom(lf);
            linkFromRef.current = lf;
            return;
          }

          if (linkFrom.id !== id && !alreadyLinked(id, toStart)) {
            api.exec('add-link', {
              link: {
                source: linkFrom.id,
                target: id,
                type: getLinkType(linkFrom.start, toStart),
              },
            });
          }
          setLinkFrom(null);
          linkFromRef.current = null;
        } else if (css.contains('wx-delete-button-icon')) {
          api.exec('delete-link', { id: selectedLinkId });
          setSelectedLinkId(null);
        } else {
          let segmentIndex;
          const segmentNode = locate(e, 'data-segment');
          if (segmentNode) segmentIndex = segmentNode.dataset.segment * 1;
          api.exec('select-task', {
            id,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex,
          });
        }
      }
      removeLinkMarker();
    },
    [
      api,
      linkFrom,
      rLinksCounter,
      selectedLink,
      alreadyLinked,
      getLinkType,
      removeLinkMarker,
    ],
  );

  const taskStyle = useCallback((task) => {
    const style = {
      left: `${task.$x}px`,
      top: `${task.$y}px`,
      width: `${task.$w}px`,
      height: `${task.$h}px`,
    };
    // Support per-task bar color — sets background on the wx-bar element
    // so progress fill (between bar background and wx-content) stays visible.
    if (task.color) style.backgroundColor = task.color;
    return style;
  }, []);

  const baselineStyle = useCallback((task) => {
    return {
      left: `${task.$x_base}px`,
      top: `${task.$y_base}px`,
      width: `${task.$w_base}px`,
      height: `${task.$h_base}px`,
    };
  }, []);

  const contextmenu = useCallback(
    (ev) => {
      if (touched || touchTimerRef.current) {
        ev.preventDefault();
        return false;
      }
    },
    [touched],
  );

  const taskTypeIds = useMemo(
    () => taskTypesValue.map((t) => t.id),
    [taskTypesValue],
  );

  const taskTypeCss = useCallback(
    (type) => {
      let css = taskTypeIds.includes(type) ? type : 'task';
      if (!['task', 'milestone', 'summary'].includes(type)) {
        css = `task ${css}`;
      }
      return css;
    },
    [taskTypeIds],
  );

  const forward = useCallback(
    (ev) => {
      api.exec(ev.action, ev.data);
    },
    [api],
  );

  const isTaskCritical = useCallback(
    (taskId) => {
      return criticalPath && tree.byId(taskId).$critical;
    },
    [criticalPath, tree],
  );

  const isLinkMarkerVisible = useCallback(
    (id) => {
      if (schedule?.auto) {
        const summaryIds = tree.getSummaryId(id, true);
        const linkFromSummaryIds = tree.getSummaryId(linkFrom.id, true);
        return (
          linkFrom?.id &&
          !(Array.isArray(summaryIds) ? summaryIds : [summaryIds]).includes(
            linkFrom.id,
          ) &&
          !(
            Array.isArray(linkFromSummaryIds)
              ? linkFromSummaryIds
              : [linkFromSummaryIds]
          ).includes(id)
        );
      }
      return linkFrom;
    },
    [schedule, tree, linkFrom],
  );

  return (
    <div
      className="wx-GKbcLEGA wx-bars"
      style={{
        lineHeight: `${adjustedTasks.length ? adjustedTasks[0].$h : 0}px`,
      }}
      ref={containerRef}
      onContextMenu={contextmenu}
      onMouseDown={mousedown}
      onMouseMove={mousemove}
      onTouchStart={touchstart}
      onTouchMove={touchmove}
      onTouchEnd={touchend}
      onClick={onClick}
      onDoubleClick={onDblClick}
      onDragStart={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <Links
        onSelectLink={onSelectLink}
        selectedLink={selectedLink}
        readonly={readonly}
        linkShape={linkShape}
        linkGradient={linkGradient}
        linkStyle={linkStyle}
        linkBundling={linkBundling}
        multiTaskRows={multiTaskRows}
        taskPositions={taskPositions}
        cellHeight={cellHeight}
      />
      {linkFrom && linkDragPos && (() => {
        const sourceTask = api.getTask(linkFrom.id);
        if (!sourceTask) return null;
        const sx = linkFrom.start ? sourceTask.$x : sourceTask.$x + sourceTask.$w;
        const sy = sourceTask.$y + (sourceTask.$h || cellHeight) / 2;
        return (
          <svg
            className="wx-link-preview"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <line
              x1={sx}
              y1={sy}
              x2={linkDragPos.x}
              y2={linkDragPos.y}
              stroke="var(--wx-gantt-link-color)"
              strokeWidth={2}
              strokeDasharray="6 3"
            />
            <circle
              cx={linkDragPos.x}
              cy={linkDragPos.y}
              r={4}
              fill="var(--wx-gantt-link-color)"
            />
          </svg>
        );
      })()}
      {adjustedTasks.map((task) => {
        if (task.$skip && task.$skip_baseline) return null;
        const isOverlapping = overlappingTaskIds.has(task.id);
        const barClass =
          `wx-bar wx-${taskTypeCss(task.type)}` +
          (touched && taskMove && task.id === taskMove.id ? ' wx-touch' : '') +
          (linkFrom && linkFrom.id === task.id ? ' wx-selected' : '') +
          (isTaskCritical(task.id) ? ' wx-critical' : '') +
          (task.$reorder ? ' wx-reorder-task' : '') +
          (splitTasks && task.segments ? ' wx-split' : '') +
          (isOverlapping ? ' wx-collision' : '');
        const leftLinkClass =
          'wx-link wx-left' +
          (linkFrom ? ' wx-visible' : '') +
          (!linkFrom ||
          (!alreadyLinked(task.id, true) && isLinkMarkerVisible(task.id))
            ? ' wx-target'
            : '') +
          (linkFrom && linkFrom.id === task.id && linkFrom.start
            ? ' wx-selected'
            : '') +
          (isTaskCritical(task.id) ? ' wx-critical' : '');
        const rightLinkClass =
          'wx-link wx-right' +
          (linkFrom ? ' wx-visible' : '') +
          (!linkFrom ||
          (!alreadyLinked(task.id, false) && isLinkMarkerVisible(task.id))
            ? ' wx-target'
            : '') +
          (linkFrom && linkFrom.id === task.id && !linkFrom.start
            ? ' wx-selected'
            : '') +
          (isTaskCritical(task.id) ? ' wx-critical' : '');
        return (
          <Fragment key={task.id}>
            {!task.$skip && (
              <div
                className={'wx-GKbcLEGA ' + barClass}
                style={taskStyle(task)}
                data-tooltip-id={task.id}
                data-id={task.id}
                tabIndex={focused === task.id ? 0 : -1}
              >
                {!readonly ? (
                  task.id === selectedLink?.target &&
                  selectedLink?.type[2] === 's' ? (
                    <Button
                      type="danger"
                      css="wx-left wx-delete-button wx-delete-link"
                    >
                      <i className="wxi-close wx-delete-button-icon"></i>
                    </Button>
                  ) : (
                    <div className={'wx-GKbcLEGA ' + leftLinkClass}>
                      <div className="wx-GKbcLEGA wx-inner"></div>
                    </div>
                  )
                ) : null}

                {task.type !== 'milestone' ? (
                  <>
                    {showProgress && task.progress && !(splitTasks && task.segments) ? (
                      <div className="wx-GKbcLEGA wx-progress-wrapper">
                        <div
                          className="wx-GKbcLEGA wx-progress-percent"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    ) : null}
                    {showProgress &&
                    !readonly &&
                    !(splitTasks && task.segments) &&
                    !(task.type == 'summary' && summary?.autoProgress) ? (
                      <div
                        className="wx-GKbcLEGA wx-progress-marker"
                        style={{ left: `calc(${task.progress}% - 10px)` }}
                      >
                        {task.progress}
                      </div>
                    ) : null}
                    {TaskTemplate ? (
                      <div className="wx-GKbcLEGA wx-content">
                        <TaskTemplate
                          data={task}
                          api={api}
                          onAction={forward}
                        />
                      </div>
                    ) : splitTasks && task.segments ? (
                      <BarSegments task={task} type={taskTypeCss(task.type)} />
                    ) : (
                      <div className="wx-GKbcLEGA wx-content">
                        {task.text || ''}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="wx-GKbcLEGA wx-content"></div>
                    {TaskTemplate ? (
                      <TaskTemplate data={task} api={api} onAction={forward} />
                    ) : (
                      <div className="wx-GKbcLEGA wx-text-out">{task.text}</div>
                    )}
                  </>
                )}

                {!readonly ? (
                  task.id === selectedLink?.target &&
                  selectedLink?.type[2] === 'e' ? (
                    <Button
                      type="danger"
                      css="wx-right wx-delete-button wx-delete-link"
                    >
                      <i className="wxi-close wx-delete-button-icon"></i>
                    </Button>
                  ) : (
                    <div className={'wx-GKbcLEGA ' + rightLinkClass}>
                      <div className="wx-GKbcLEGA wx-inner"></div>
                    </div>
                  )
                ) : null}

                {isOverlapping && (
                  <div
                    className="wx-GKbcLEGA wx-collision-warning"
                    title="This task overlaps with another task in the same row"
                  >
                    !
                  </div>
                )}

                {summaryColCounts &&
                  task.type === 'summary' &&
                  (() => {
                    const colCounts = summaryColCounts.get(task.id);
                    const startCol = Math.floor(task.$x / lengthUnitWidth);
                    const endCol = Math.ceil(
                      (task.$x + task.$w) / lengthUnitWidth,
                    );
                    return (
                      <div className="wx-GKbcLEGA wx-summary-week-counts">
                        {Array.from({ length: endCol - startCol }, (_, i) => {
                          const col = startCol + i;
                          const count = colCounts?.get(col) || 0;
                          return (
                            <span
                              key={col}
                              className={`wx-GKbcLEGA wx-week-count${count === 0 ? ' wx-week-count-zero' : ''}`}
                              style={{
                                position: 'absolute',
                                left: `${col * lengthUnitWidth - task.$x}px`,
                                width: `${lengthUnitWidth}px`,
                                top: 0,
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {count}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })()}
              </div>
            )}
            {baselinesValue && !task.$skip_baseline ? (
              <div
                className={
                  'wx-GKbcLEGA wx-baseline' +
                  (task.type === 'milestone' ? ' wx-milestone' : '')
                }
                style={baselineStyle(task)}
              ></div>
            ) : null}
          </Fragment>
        );
      })}

      {/* Marquee selection rectangle */}
      {marquee &&
        (() => {
          const left = Math.min(marquee.startX, marquee.currentX);
          const top = Math.min(marquee.startY, marquee.currentY);
          const width = Math.abs(marquee.currentX - marquee.startX);
          const height = Math.abs(marquee.currentY - marquee.startY);
          return (
            <div
              className="wx-GKbcLEGA wx-marquee-selection"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
              }}
            />
          );
        })()}

      {/* Paste preview ghost tasks */}
      {pastePreview &&
        pastePreview.currentX != null &&
        pastePreview.tasks.map((task, i) => {
          const cellIndex = Math.floor(pastePreview.currentX / lengthUnitWidth);
          const x =
            (cellIndex + (task._startCellOffset || 0)) * lengthUnitWidth;
          const w = task._originalWidth || lengthUnitWidth;
          const h = task._originalHeight || cellHeight;
          const rowY = rowYPositions.get(task.row) ?? (task.$y || 0);
          return (
            <div
              key={`preview-${i}`}
              className="wx-GKbcLEGA wx-bar wx-task wx-paste-preview"
              style={{ left: x, top: rowY, width: w, height: h }}
            >
              <div className="wx-GKbcLEGA wx-content">
                {task.$barText || task.text}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Bars;
