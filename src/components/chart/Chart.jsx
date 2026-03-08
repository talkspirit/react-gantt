import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useContext,
  useCallback,
} from 'react';
import CellGrid from './CellGrid.jsx';
import Bars from './Bars.jsx';
import { hotkeys } from '@svar-ui/grid-store';
import storeContext from '../../context';
import { useStore, useStoreWithCounter } from '@svar-ui/lib-react';
import './Chart.css';
import TimeScales from './TimeScale.jsx';
import { useRenderTime } from '../../helpers/debug.js';

function Chart(props) {
  const {
    readonly,
    fullWidth,
    fullHeight,
    taskTemplate,
    cellBorders,
    highlightTime,
    onScaleClick,
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

  const [selected, selectedCounter] = useStoreWithCounter(api, '_selected');
  const rScrollTop = useStore(api, 'scrollTop');
  const cellHeight = useStore(api, 'cellHeight');
  const cellWidth = useStore(api, 'cellWidth');
  const scales = useStore(api, '_scales');
  const markers = useStore(api, '_markers');
  const rScrollTask = useStore(api, '_scrollTask');
  const zoom = useStore(api, 'zoom');

  const [chartHeight, setChartHeight] = useState();
  const chartRef = useRef(null);

  const rTasks = useStore(api, '_tasks');

  const extraRows = 1 + (scales?.rows?.length || 0);

  // Compute adjusted Y positions for multiTaskRows using cumulative heights
  // (not rowIndex * cellHeight) to account for variable row heights.
  const { taskYPositions, rowHeightMap } = useMemo(() => {
    if (!multiTaskRows || !rowMapping || !rTasks?.length)
      return { taskYPositions: null, rowHeightMap: null };

    const yMap = new Map();
    const heightMap = new Map();
    const seenRows = [];

    rTasks.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!seenRows.includes(rowId)) {
        seenRows.push(rowId);
      }
    });

    // Build cumulative Y offsets using actual row heights
    const rowYOffsets = new Map();
    let cumulativeY = 0;
    for (const rowId of seenRows) {
      rowYOffsets.set(rowId, cumulativeY);
      const rowH =
        (rowHeightOverrides && rowHeightOverrides[rowId]) || cellHeight;
      heightMap.set(rowId, rowH);
      cumulativeY += rowH;
    }

    rTasks.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      yMap.set(task.id, rowYOffsets.get(rowId) ?? 0);
    });

    return { taskYPositions: yMap, rowHeightMap: heightMap };
  }, [rTasks, multiTaskRows, rowMapping, cellHeight, rowHeightOverrides]);

  const selectStyle = useMemo(() => {
    const t = [];
    if (selected && selected.length && cellHeight) {
      selected.forEach((obj) => {
        const adjustedY = taskYPositions?.get(obj.id) ?? obj.$y;
        // Use the row's actual height for selection highlight
        let h = cellHeight;
        if (rowHeightMap && rowMapping) {
          const rowId = rowMapping.taskRows.get(obj.id) ?? obj.id;
          h = rowHeightMap.get(rowId) ?? cellHeight;
        }
        t.push({ height: `${h}px`, top: `${adjustedY - 3}px` });
      });
    }
    return t;
  }, [selectedCounter, cellHeight, taskYPositions, rowHeightMap, rowMapping]);

  const chartGridHeight = useMemo(
    () => Math.max(chartHeight || 0, fullHeight),
    [chartHeight, fullHeight],
  );

  // Compute rowLayout for CellGrid when variable row heights are active
  const rowLayout = useMemo(() => {
    if (!rowHeightOverrides || !multiTaskRows || !rowMapping || !rTasks?.length)
      return null;
    // Check if any override actually differs from cellHeight
    const hasOverride = Object.values(rowHeightOverrides).some(
      (h) => h !== cellHeight,
    );
    if (!hasOverride) return null;

    const seenRows = [];
    rTasks.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!seenRows.includes(rowId)) seenRows.push(rowId);
    });
    return seenRows.map((rowId) => ({
      id: rowId,
      height: rowHeightOverrides[rowId] || cellHeight,
    }));
  }, [rTasks, rowMapping, rowHeightOverrides, multiTaskRows, cellHeight]);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    if (typeof rScrollTop === 'number') {
      // When multiTaskRows is enabled, all bars are positioned absolutely using
      // cumulative Y offsets. Skip SVAR's scroll offset to prevent bars from
      // being pushed off screen by a stale scrollTop value.
      el.scrollTop = multiTaskRows ? 0 : rScrollTop;
    }
  }, [rScrollTop, multiTaskRows]);

  const onScroll = () => {
    const scroll = { left: true };
    setScroll(scroll);
  };

  function setScroll(scroll) {
    const el = chartRef.current;
    if (!el) return;
    const pos = {};
    if (scroll.left) pos.left = el.scrollLeft;
    api.exec('scroll-chart', pos);
  }

  function dataRequest() {
    const el = chartRef.current;
    const clientHeightLocal = chartHeight || 0;
    const num = Math.ceil(clientHeightLocal / (cellHeight || 1)) + 1;
    const pos = Math.floor(((el && el.scrollTop) || 0) / (cellHeight || 1));
    const start = Math.max(0, pos - extraRows);
    const end = pos + num + extraRows;
    const from = start * (cellHeight || 0);
    api.exec('render-data', {
      start,
      end,
      from,
    });
  }

  useEffect(() => {
    dataRequest();
  }, [chartHeight, rScrollTop]);

  const showTask = useCallback(
    (value) => {
      if (!value) return;

      const { id, mode } = value;

      if (mode.toString().indexOf('x') < 0) return;
      const el = chartRef.current;
      if (!el) return;
      const { clientWidth } = el;
      const task = api.getTask(id);
      if (task.$x + task.$w < el.scrollLeft) {
        api.exec('scroll-chart', { left: task.$x - (cellWidth || 0) });
        el.scrollLeft = task.$x - (cellWidth || 0);
      } else if (task.$x >= clientWidth + el.scrollLeft) {
        const width = clientWidth < task.$w ? cellWidth || 0 : task.$w;
        api.exec('scroll-chart', { left: task.$x - clientWidth + width });
        el.scrollLeft = task.$x - clientWidth + width;
      }
    },
    [api, cellWidth],
  );

  useEffect(() => {
    showTask(rScrollTask);
  }, [rScrollTask]);

  function onWheel(e) {
    if (zoom && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const el = chartRef.current;
      const dir = -Math.sign(e.deltaY);
      const offset = e.clientX - (el ? el.getBoundingClientRect().left : 0);
      api.exec('zoom-scale', {
        dir,
        offset,
      });
    }
  }

  function getHoliday(cell) {
    const style = highlightTime(cell.date, cell.unit);
    if (style)
      return {
        css: style,
        width: cell.width,
      };
    return null;
  }

  const holidays = useMemo(() => {
    return scales &&
      (scales.minUnit === 'hour' || scales.minUnit === 'day') &&
      highlightTime
      ? scales.rows[scales.rows.length - 1].cells.map(getHoliday)
      : null;
  }, [scales, highlightTime]);

  const handleHotkey = useCallback(
    (ev) => {
      ev.eventSource = 'chart';
      api.exec('hotkey', ev);
    },
    [api],
  );

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const update = () => setChartHeight(el.clientHeight);
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [chartRef.current]);

  const cleanupRef = useRef(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    if (cleanupRef.current) return;
    cleanupRef.current = hotkeys(el, {
      keys: {
        arrowup: true,
        arrowdown: true,
      },
      exec: (v) => handleHotkey(v),
    });
    return () => {
      cleanupRef.current?.destroy();
      cleanupRef.current = null;
    };
  }, []);

  useEffect(() => {
    const node = chartRef.current;
    if (!node) return;

    const handler = onWheel;
    node.addEventListener('wheel', handler);
    return () => {
      node.removeEventListener('wheel', handler);
    };
  }, [onWheel]);

  useRenderTime('chart');

  return (
    <div
      className="wx-mR7v2Xag wx-chart"
      tabIndex={-1}
      ref={chartRef}
      onScroll={onScroll}
    >
      <TimeScales
        highlightTime={highlightTime}
        onScaleClick={onScaleClick}
        scales={scales}
      />
      {markers && markers.length ? (
        <div
          className="wx-mR7v2Xag wx-markers"
          style={{ height: `${chartGridHeight}px` }}
        >
          {markers.map((marker, i) => (
            <div
              key={i}
              className={`wx-mR7v2Xag wx-marker ${marker.css || ''}`}
              style={{ left: `${marker.left}px` }}
            >
              <div className="wx-mR7v2Xag wx-content">{marker.text}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div
        className="wx-mR7v2Xag wx-area"
        style={{ width: `${fullWidth}px`, height: `${chartGridHeight}px` }}
      >
        {holidays ? (
          <div
            className="wx-mR7v2Xag wx-gantt-holidays"
            style={{ height: '100%' }}
          >
            {holidays.map((holiday, i) =>
              holiday ? (
                <div
                  key={i}
                  className={'wx-mR7v2Xag ' + holiday.css}
                  style={{
                    width: `${holiday.width}px`,
                    left: `${i * holiday.width}px`,
                  }}
                />
              ) : null,
            )}
          </div>
        ) : null}

        <CellGrid borders={cellBorders} rowLayout={rowLayout} />

        {selected && selected.length
          ? selected.map((obj, index) =>
              obj.$y ? (
                <div
                  key={obj.id}
                  className="wx-mR7v2Xag wx-selected"
                  data-id={obj.id}
                  style={selectStyle[index]}
                ></div>
              ) : null,
            )
          : null}

        <Bars
          readonly={readonly}
          taskTemplate={taskTemplate}
          multiTaskRows={multiTaskRows}
          rowMapping={rowMapping}
          rowHeightOverrides={rowHeightOverrides}
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
  );
}

export default Chart;
