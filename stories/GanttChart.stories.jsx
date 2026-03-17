import { useMemo, useState, useRef, useCallback } from 'react';
import { getData, getTypedData, taskTypes, complexScales } from '../demos/data';
import { Gantt, Editor, ContextMenu } from '../src/';
import { Fullscreen, DatePicker, Field, Locale, Switch } from '@svar-ui/react-core';
import MyTaskContent from '../demos/custom/MyTaskContent.jsx';
import '../demos/cases/GanttTaskTypes.css';
import '../demos/cases/GanttFullscreen.css';
import '../demos/cases/GanttStartEnd.css';

function TaskTypesGantt() {
  const data = useMemo(() => getTypedData(), []);
  const [api, setApi] = useState(null);

  return (
    <div className="wx-I1glfWSB demo">
      <ContextMenu api={api}>
        <Gantt
          init={setApi}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
          taskTypes={taskTypes}
        />
      </ContextMenu>
      {api && <Editor api={api} />}
    </div>
  );
}

function TaskTextGantt() {
  const data = useMemo(() => getData(), []);
  const api = useRef(null);

  const doClick = useCallback((ev) => {
    api.current.exec('update-task', {
      id: ev.id,
      task: { clicked: ev.clicked },
    });
  }, []);

  return (
    <Gantt
      ref={api}
      onCustomClick={doClick}
      taskTemplate={MyTaskContent}
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
    />
  );
}

function HolidaysGantt() {
  const data = useMemo(() => getData(), []);
  const scales = useMemo(
    () => [
      { unit: 'year', step: 1, format: '%Y' },
      { unit: 'month', step: 2, format: '%F %Y' },
      { unit: 'week', step: 1, format: 'Week %W' },
      { unit: 'day', step: 1, format: '%j, %l' },
    ],
    [],
  );

  function highlightTime(d, u) {
    const day = d.getDay();
    const isDayOff = day == 0 || day == 6;
    if (u == 'day' && isDayOff) return 'wx-weekend';
    if (u == 'hour') {
      const h = d.getHours();
      if (isDayOff || h < 8 || h == 12 || h > 17) return 'wx-weekend';
    }
    return '';
  }

  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={scales}
      highlightTime={highlightTime}
      zoom
    />
  );
}

function FullscreenGantt() {
  const data = useMemo(() => getData(), []);

  return (
    <div className="wx-0qqHrQ85 demo">
      <h4>Click the &quot;expand&quot; icon, or click on Gantt and press Ctrl+Shift+F</h4>
      <div className="wx-0qqHrQ85 gtcell">
        <Fullscreen hotkey="ctrl+shift+f">
          <Gantt tasks={data.tasks} links={data.links} />
        </Fullscreen>
      </div>
    </div>
  );
}

function ScalesGantt() {
  const data = useMemo(() => getData(), []);

  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={complexScales}
      start={new Date(2026, 3, 1)}
      end={new Date(2026, 4, 12)}
      cellWidth={60}
    />
  );
}

function StartEndGantt() {
  const data = useMemo(() => getData(), []);
  const [start, setStart] = useState(new Date(2026, 3, 5));
  const [end, setEnd] = useState(new Date(2026, 4, 1));
  const [autoScale, setAutoScale] = useState(false);

  return (
    <div className="wx-FJQN2sNt demo">
      <Locale>
        <div className="wx-FJQN2sNt bar">
          <Field label="Start" position="left">
            <DatePicker value={start} onChange={({ value }) => setStart(value)} />
          </Field>
          <Field label="End" position="left">
            <DatePicker value={end} onChange={({ value }) => setEnd(value)} />
          </Field>
          <Field label="autoScale" position="left">
            <div className="wx-FJQN2sNt input">
              <Switch value={autoScale} onChange={({ value }) => setAutoScale(value)} />
            </div>
          </Field>
        </div>
      </Locale>
      <div className="wx-FJQN2sNt gantt">
        <Gantt
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
          autoScale={autoScale}
          zoom
          start={start}
          end={end}
        />
      </div>
    </div>
  );
}

export default {
  title: 'Gantt/Chart',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Chart area features: task types, custom task bar content, weekend highlighting, fullscreen mode, complex multi-row scales, and start/end date boundaries.',
      },
    },
  },
};

export const TaskTypes = {
  render: () => <TaskTypesGantt />,
  parameters: { docs: { description: { story: 'Custom task types via the `taskTypes` prop with typed data. Right-click tasks for context menu, double-click to open editor.' } } },
};
export const TaskText = {
  render: () => <TaskTextGantt />,
  parameters: { docs: { description: { story: 'Custom task bar content using `taskTemplate`. Each bar renders a `MyTaskContent` component. Click the custom buttons inside bars to test the `onCustomClick` handler.' } } },
};
export const Holidays = {
  render: () => <HolidaysGantt />,
  parameters: { docs: { description: { story: 'Weekend highlighting using `highlightTime` callback. Saturdays and Sundays are shaded. Zoom in (Ctrl+wheel) to see hour-level non-working time (before 8am, lunch, after 5pm).' } } },
};
export const WithFullscreen = {
  render: () => <FullscreenGantt />,
  parameters: { docs: { description: { story: 'Wrap Gantt in `<Fullscreen>` component. Click the expand icon or press Ctrl+Shift+F to toggle fullscreen mode.' } } },
};
export const ComplexScales = {
  render: () => <ScalesGantt />,
  parameters: { docs: { description: { story: 'Multi-level time scales (year, quarter, month, week, day) with explicit `start`/`end` boundaries and narrower `cellWidth`.' } } },
};
export const StartEnd = {
  render: () => <StartEndGantt />,
  parameters: { docs: { description: { story: 'Control the visible date range with date pickers. Toggle `autoScale` to let the Gantt auto-calculate optimal scale levels for the given range.' } } },
};
