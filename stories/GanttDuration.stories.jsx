import { useMemo, useState, useCallback } from 'react';
import { getData } from '../demos/data';
import {
  Gantt,
  ContextMenu,
  Editor,
  getEditorItems,
  defaultColumns,
} from '../src/';
import { RadioButtonGroup } from '@svar-ui/react-core';
import { format } from 'date-fns';
import '../demos/cases/GanttDurationUnitChanges.css';

function DurationUnitChangesGantt() {
  const initialData = getData();
  const [tasks, setTasks] = useState(initialData.tasks);
  const [links] = useState(initialData.links);
  const scalesMap = useMemo(
    () => ({
      hour: getData('hour').scales,
      day: getData().scales,
    }),
    [],
  );
  const options = [
    { id: 'day', label: 'Day' },
    { id: 'hour', label: 'Hour' },
  ];
  const [durationUnit, setDurationUnit] = useState('day');
  const [scales, setScales] = useState(scalesMap['day']);
  const [api, setApi] = useState(null);

  const items = useMemo(
    () =>
      getEditorItems().map((ed) => ({
        ...ed,
        ...(ed.comp === 'date' && {
          config: { time: durationUnit === 'hour' },
        }),
      })),
    [durationUnit],
  );

  function handleUnitChange({ value }) {
    const sTasks = api.serialize().map((task) => {
      if (task.start && task.end) {
        const ms = 1000 * 60 * 60 * (value === 'day' ? 24 : 1);
        const duration = Math.floor((task.end - task.start) / ms);
        return { ...task, duration };
      }
      return task;
    });
    setTasks(sTasks);
    setDurationUnit(value);
    setScales(scalesMap[value]);
  }

  return (
    <div className="wx-d4Cw5r6y rows">
      <div className="wx-d4Cw5r6y bar">
        <div className="wx-d4Cw5r6y label">Gantt duration unit</div>
        <RadioButtonGroup
          options={options}
          value={durationUnit}
          type="inline"
          onChange={handleUnitChange}
        />
      </div>
      <div className="wx-d4Cw5r6y gtcell">
        <ContextMenu api={api}>
          <Gantt
            init={setApi}
            tasks={tasks}
            links={links}
            scales={scales}
            cellWidth={40}
            durationUnit={durationUnit}
            lengthUnit={'hour'}
          />
        </ContextMenu>
        {api && <Editor api={api} items={items} />}
      </div>
    </div>
  );
}

function DurationUnitHourGantt() {
  const { tasks, links, scales } = useMemo(() => getData('hour'), []);
  const [api, setApi] = useState(null);

  const items = useMemo(
    () =>
      getEditorItems().map((ed) => ({
        ...ed,
        ...(ed.comp === 'date' && { config: { time: true } }),
      })),
    [],
  );

  const columns = useMemo(
    () =>
      defaultColumns.map((col) => ({
        ...col,
        ...(col.id === 'start' && {
          template: (d) => format(d, 'MMM d, HH:mm'),
          width: 120,
        }),
      })),
    [],
  );

  const highlightTime = useCallback((date, unit) => {
    const h = date.getHours();
    if ((unit === 'hour' && h < 8) || h > 21) return 'wx-weekend';
    return '';
  }, []);

  return (
    <>
      <ContextMenu api={api}>
        <Gantt
          init={setApi}
          tasks={tasks}
          links={links}
          columns={columns}
          scales={scales}
          cellWidth={40}
          durationUnit="hour"
          lengthUnit="minute"
          highlightTime={highlightTime}
        />
      </ContextMenu>
      {api && <Editor api={api} items={items} />}
    </>
  );
}

export default {
  title: 'Gantt/Duration',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Duration unit handling: switch between day and hour units at runtime, and hour-based scheduling with time-aware editors.',
      },
    },
  },
};

export const UnitChanges = {
  render: () => <DurationUnitChangesGantt />,
  parameters: { docs: { description: { story: 'Toggle between day and hour duration units using the radio buttons. Task durations are recalculated on switch. The editor date pickers gain time inputs in hour mode.' } } },
};
export const HourUnit = {
  render: () => <DurationUnitHourGantt />,
  parameters: { docs: { description: { story: 'Hour-based Gantt with minute-level `lengthUnit`. Grid shows formatted times (HH:mm). Non-working hours (before 8am, after 9pm) are highlighted via `highlightTime`.' } } },
};
