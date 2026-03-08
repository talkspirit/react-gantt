import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useContext,
} from 'react';
import { hotkeys } from '@svar-ui/grid-store';
import Grid from './grid/Grid.jsx';
import Chart from './chart/Chart.jsx';
import Resizer from './Resizer.jsx';
import { modeObserver } from '../helpers/modeResizeObserver';
import {
  computeLanePacking,
  computeAutoRowHeights,
  mergeRowHeightOverrides,
} from '../helpers/lanePacking';
import storeContext from '../context';
import { useStore } from '@svar-ui/lib-react';
import './Layout.css';
import { flushSync } from 'react-dom';

function Layout(props) {
  const {
    taskTemplate,
    readonly,
    cellBorders,
    highlightTime,
    onScaleClick,
    onTableAPIChange,
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
  } = props;

  const api = useContext(storeContext);

  const rTasks = useStore(api, '_tasks');
  const rScales = useStore(api, '_scales');
  const rCellHeight = useStore(api, 'cellHeight');
  const rColumns = useStore(api, 'columns');
  const rScrollTask = useStore(api, '_scrollTask');
  const undo = useStore(api, 'undo');

  // Compute rowMapping using reactive store tasks (updates when tasks are added/removed)
  const computedRowMapping = useMemo(() => {
    if (!multiTaskRows) return rowMapping;

    const rowMap = new Map();
    const taskRows = new Map();

    rTasks.forEach((task) => {
      const rowId = task.row ?? task.id;
      taskRows.set(task.id, rowId);

      if (!rowMap.has(rowId)) {
        rowMap.set(rowId, []);
      }
      rowMap.get(rowId).push(task.id);
    });

    return { rowMap, taskRows };
  }, [rTasks, multiTaskRows, rowMapping]);

  // Auto-compute row heights from lane packing when multiTaskRows is enabled.
  // This ensures rows with overlapping tasks expand to fit all lanes.
  const effectiveRowHeightOverrides = useMemo(() => {
    if (!multiTaskRows || !computedRowMapping || !rTasks?.length) {
      return rowHeightOverrides;
    }

    const { rowLaneCounts } = computeLanePacking(rTasks, computedRowMapping);

    // Bar height = cellHeight - vertical padding SVAR applies.
    // This matches Bars.jsx's bar sizing and the workspace formula.
    const barHeight = rCellHeight - 6;

    const autoOverrides = computeAutoRowHeights(
      rowLaneCounts,
      rCellHeight,
      barHeight,
    );

    return mergeRowHeightOverrides(autoOverrides, rowHeightOverrides);
  }, [
    rTasks,
    multiTaskRows,
    computedRowMapping,
    rCellHeight,
    rowHeightOverrides,
  ]);

  const [compactMode, setCompactMode] = useState(false);
  let [gridWidth, setGridWidth] = useState(0);
  const [ganttWidth, setGanttWidth] = useState(0);
  const [ganttHeight, setGanttHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(undefined);
  const [display, setDisplay] = useState('all');

  const lastDisplay = useRef(null);

  const handleResize = useCallback(
    (mode) => {
      setCompactMode((prev) => {
        if (mode !== prev) {
          if (mode) {
            lastDisplay.current = display;
            if (display === 'all') setDisplay('grid');
          } else if (!lastDisplay.current || lastDisplay.current === 'all') {
            setDisplay('all');
          }
        }
        return mode;
      });
    },
    [display],
  );

  useEffect(() => {
    const ro = modeObserver(handleResize);
    ro.observe();
    return () => {
      ro.disconnect();
    };
  }, [handleResize]);

  const gridColumnWidth = useMemo(() => {
    let w;
    if (rColumns.every((c) => c.width && !c.flexgrow)) {
      w = rColumns.reduce((acc, c) => acc + parseInt(c.width), 0);
    } else {
      if (compactMode && display === 'chart') {
        w = parseInt(rColumns.find((c) => c.id === 'action')?.width) || 50;
      } else {
        w = 440;
      }
    }
    gridWidth = w;
    return w;
  }, [rColumns, compactMode, display]);

  useEffect(() => {
    setGridWidth(gridColumnWidth);
  }, [gridColumnWidth]);

  const scrollSize = useMemo(
    () => (ganttWidth ?? 0) - (innerWidth ?? 0),
    [ganttWidth, innerWidth],
  );
  const fullWidth = useMemo(() => rScales.width, [rScales]);
  // Extra bottom space so the chart's horizontal scrollbar doesn't overlap the last row.
  const SCROLLBAR_PADDING = 14;
  const fullHeight = useMemo(() => {
    let height;
    if (!multiTaskRows || !computedRowMapping) {
      height = rTasks.length * rCellHeight;
    } else {
      // Collect unique rows in order and sum their heights
      const seenRows = [];
      rTasks.forEach((task) => {
        const rowId = computedRowMapping.taskRows.get(task.id) ?? task.id;
        if (!seenRows.includes(rowId)) {
          seenRows.push(rowId);
        }
      });
      height = 0;
      for (const rowId of seenRows) {
        height +=
          (effectiveRowHeightOverrides && effectiveRowHeightOverrides[rowId]) ||
          rCellHeight;
      }
    }
    return height + SCROLLBAR_PADDING;
  }, [
    rTasks,
    rCellHeight,
    multiTaskRows,
    computedRowMapping,
    effectiveRowHeightOverrides,
  ]);
  const scrollHeight = useMemo(
    () => rScales.height + fullHeight + scrollSize,
    [rScales, fullHeight, scrollSize],
  );
  const totalWidth = useMemo(
    () => gridWidth + fullWidth,
    [gridWidth, fullWidth],
  );

  const chartRef = useRef(null);

  // Suppress expand-scale for a short window after any zoom action so it
  // doesn't fight the zoom direction (zoom-out shrinks content width →
  // expand-scale would immediately widen it back).
  const zoomLockRef = useRef(false);
  const zoomLockTimer = useRef(null);

  useEffect(() => {
    const lock = () => {
      zoomLockRef.current = true;
      clearTimeout(zoomLockTimer.current);
      zoomLockTimer.current = setTimeout(() => {
        zoomLockRef.current = false;
      }, 300);
    };
    api.on('zoom-scale', lock);
    api.on('set-scale', lock);
    return () => {
      clearTimeout(zoomLockTimer.current);
    };
  }, [api]);

  const expandScale = useCallback(() => {
    Promise.resolve().then(() => {
      if (zoomLockRef.current) return;
      if ((ganttWidth ?? 0) > (totalWidth ?? 0)) {
        const minWidth = (ganttWidth ?? 0) - gridWidth;
        api.exec('expand-scale', { minWidth });
      }
    });
  }, [ganttWidth, totalWidth, gridWidth, api]);

  // Use a ref so the ResizeObserver always calls the latest expandScale
  // without recreating the observer (which fires immediately on creation
  // per spec, causing expand-scale to fight zoom-scale).
  const expandScaleRef = useRef(expandScale);
  expandScaleRef.current = expandScale;

  useEffect(() => {
    let ro;
    if (chartRef.current) {
      ro = new ResizeObserver(() => expandScaleRef.current());
      ro.observe(chartRef.current);
    }
    return () => {
      if (ro) ro.disconnect();
    };
  }, [chartRef.current]);

  const ganttDivRef = useRef(null);
  const pseudoRowsRef = useRef(null);

  const onScroll = useCallback(() => {
    const el = ganttDivRef.current;
    if (el) {
      api.exec('scroll-chart', {
        top: el.scrollTop,
      });
    }
  }, [api]);

  const latest = useRef({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0,
  });

  useEffect(() => {
    latest.current = {
      rTasks,
      rScales,
      rCellHeight,
      scrollSize,
      ganttDiv: ganttDivRef.current,
      ganttHeight: ganttHeight ?? 0,
    };
  }, [rTasks, rScales, rCellHeight, scrollSize, ganttHeight]);

  const scrollToTask = useCallback(
    (value) => {
      if (!value) return;
      const {
        rTasks: t,
        rScales: sc,
        rCellHeight: ch,
        scrollSize: ss,
        ganttDiv: el,
        ganttHeight: gh,
      } = latest.current;
      if (!el) return;
      const { id } = value;
      const index = t.findIndex((tt) => tt.id === id);
      if (index > -1) {
        const height = gh - sc.height;
        const scrollY = index * ch;
        const now = el.scrollTop;
        let top = null;
        if (scrollY < now) {
          top = scrollY;
        } else if (scrollY + ch > now + height) {
          top = scrollY - height + ch + ss;
        }
        if (top !== null) {
          api.exec('scroll-chart', { top: Math.max(top, 0) });
          ganttDivRef.current.scrollTop = Math.max(top, 0);
        }
      }
    },
    [api],
  );

  useEffect(() => {
    scrollToTask(rScrollTask);
  }, [rScrollTask]);

  useEffect(() => {
    const ganttDiv = ganttDivRef.current;
    const pseudoRows = pseudoRowsRef.current;
    if (!ganttDiv || !pseudoRows) return;
    const update = () => {
      flushSync(() => {
        setGanttHeight(ganttDiv.offsetHeight);
        setGanttWidth(ganttDiv.offsetWidth);
        setInnerWidth(pseudoRows.offsetWidth);
      });
    };
    const ro = new ResizeObserver(update);
    ro.observe(ganttDiv);
    return () => ro.disconnect();
  }, [ganttDivRef.current]);

  const layoutRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (cleanupRef.current) {
      cleanupRef.current.destroy();
      cleanupRef.current = null;
    }
    const node = layoutRef.current;
    if (!node) return;

    cleanupRef.current = hotkeys(node, {
      keys: {
        'ctrl+c': true,
        'ctrl+v': true,
        'ctrl+x': true,
        'ctrl+d': true,
        backspace: true,
        'ctrl+z': undo,
        'ctrl+y': undo,
      },
      exec: (ev) => {
        if (!ev.isInput) api.exec('hotkey', ev);
      },
    });

    return () => {
      cleanupRef.current?.destroy();
      cleanupRef.current = null;
    };
  }, [undo]);

  return (
    <div className="wx-jlbQoHOz wx-gantt" ref={ganttDivRef} onScroll={onScroll}>
      <div
        className="wx-jlbQoHOz wx-pseudo-rows"
        style={{ height: scrollHeight, width: '100%' }}
        ref={pseudoRowsRef}
      >
        <div
          className="wx-jlbQoHOz wx-stuck"
          style={{
            height: ganttHeight,
            width: innerWidth,
          }}
        >
          <div tabIndex={0} className="wx-jlbQoHOz wx-layout" ref={layoutRef}>
            {rColumns.length ? (
              <>
                <Grid
                  display={display}
                  compactMode={compactMode}
                  columnWidth={gridColumnWidth}
                  width={gridWidth}
                  readonly={readonly}
                  fullHeight={fullHeight}
                  onTableAPIChange={onTableAPIChange}
                  multiTaskRows={multiTaskRows}
                  rowMapping={computedRowMapping}
                  rowHeightOverrides={effectiveRowHeightOverrides}
                />
                <Resizer
                  value={gridWidth}
                  display={display}
                  compactMode={compactMode}
                  containerWidth={ganttWidth}
                  onMove={(value) => setGridWidth(value)}
                  onDisplayChange={(display) => setDisplay(display)}
                />
              </>
            ) : null}

            <div className="wx-jlbQoHOz wx-content" ref={chartRef}>
              <Chart
                readonly={readonly}
                fullWidth={fullWidth}
                fullHeight={fullHeight}
                taskTemplate={taskTemplate}
                cellBorders={cellBorders}
                highlightTime={highlightTime}
                onScaleClick={onScaleClick}
                multiTaskRows={multiTaskRows}
                rowMapping={computedRowMapping}
                rowHeightOverrides={effectiveRowHeightOverrides}
                allowTaskIntersection={allowTaskIntersection}
                summaryBarCounts={summaryBarCounts}
                marqueeSelect={marqueeSelect}
                copyPaste={copyPaste}
                linkShape={linkShape}
                linkGradient={linkGradient}
                linkStyle={linkStyle}
                linkBundling={linkBundling}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
