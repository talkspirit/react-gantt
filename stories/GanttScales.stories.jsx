import { useMemo, useRef, useState } from 'react';
import { getData, bigScales } from '../demos/data';
import { Gantt, registerScaleUnit } from '../src/';
import { Select } from '@svar-ui/react-core';
import {
  startOfMonth,
  endOfMonth,
  isSameMonth,
  addMonths,
  addDays,
  differenceInDays,
  format,
} from 'date-fns';
import '../demos/cases/GanttMinScaleUnit.css';
import '../demos/cases/GanttLengthUnit.css';

const getMidDate = (d) => (d.getMonth() === 1 ? 15 : 16);

const sprintStart = (d) => {
  const monthStart = startOfMonth(d);
  const midDate = getMidDate(d);
  if (d.getDate() >= midDate) monthStart.setDate(midDate);
  return monthStart;
};

const sprintEnd = (d) => {
  const monthEnd = endOfMonth(d);
  const midDate = getMidDate(d);
  if (d.getDate() < midDate) monthEnd.setDate(midDate - 1);
  return monthEnd;
};

const sprintFormat = (d) => {
  const monthStr = format(d, 'MMMM');
  const start = d.getDate();
  const end = sprintEnd(d).getDate();
  return `${monthStr} ${start} - ${end}`;
};

let sprintRegistered = false;
function ensureSprintRegistered() {
  if (sprintRegistered) return;
  registerScaleUnit('sprint', {
    start: sprintStart,
    end: sprintEnd,
    isSame: (a, b) => {
      if (!a || !b) return true;
      const sameMonth = isSameMonth(a, b);
      if (!sameMonth) return false;
      const midDate = getMidDate(a);
      return a.getDate() < midDate == b.getDate() < midDate;
    },
    add: (d, amount) => {
      const date = d.getDate();
      const start = sprintStart(d);
      const diff = date - start.getDate();
      let newDate = addMonths(start, Math.floor(amount / 2));
      const midDate = getMidDate(newDate);
      if (amount % 2) {
        newDate = addDays(newDate, midDate);
        newDate = sprintStart(newDate);
      }
      return addDays(newDate, diff);
    },
    diff: (endDate, startDate) => {
      return Math.floor(differenceInDays(endDate, startDate) / 15);
    },
    smallerCount: {
      day: (d) => {
        if (!d) return 15;
        const start = sprintStart(d).getDate();
        const end = sprintEnd(d).getDate();
        return end - start + 1;
      },
    },
    biggerCount: {
      year: 24,
      quarter: 6,
      month: 2,
    },
  });
  sprintRegistered = true;
}

function CustomScaleUnitGantt() {
  const data = useMemo(() => getData(), []);

  const registeredRef = useRef(false);
  if (!registeredRef.current) {
    ensureSprintRegistered();
    registeredRef.current = true;
  }

  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={[
        { unit: 'month', step: 1, format: '%F %Y' },
        { unit: 'sprint', step: 1, format: sprintFormat },
        { unit: 'day', step: 1, format: '%j' },
      ]}
      zoom={true}
      start={new Date(2026, 3, 1)}
      end={new Date(2026, 5, 1)}
      cellWidth={60}
    />
  );
}

function MinScaleUnitGantt() {
  const data = useMemo(() => getData(), []);

  const registeredRef = useRef(false);
  if (!registeredRef.current) {
    ensureSprintRegistered();
    registeredRef.current = true;
  }

  const scaleOptions = [
    { id: 1, label: 'sprint' },
    { id: 2, label: 'month, sprint' },
    { id: 3, label: 'month, sprint, week' },
    { id: 4, label: 'month, sprint, week, day' },
  ];

  const allScales = useMemo(
    () => [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'sprint', step: 1, format: sprintFormat },
      { unit: 'week', step: 1, format: '%w' },
      { unit: 'day', step: 1, format: '%j' },
    ],
    [],
  );

  const [scaleOption, setScaleOption] = useState(2);
  const scales = useMemo(() => {
    if (scaleOption == 1) return [allScales[1]];
    if (scaleOption == 2) return allScales.slice(0, 2);
    if (scaleOption == 3) return allScales.slice(0, 3);
    return allScales;
  }, [scaleOption, allScales]);

  return (
    <div className="wx-megyPaP4 demo">
      <div className="wx-megyPaP4 bar">
        <Select
          value={scaleOption}
          options={scaleOptions}
          onChange={({ value }) => setScaleOption(value)}
        />
      </div>
      <div className="wx-megyPaP4 gantt">
        <Gantt
          tasks={data.tasks}
          links={data.links}
          scales={scales}
          zoom={true}
          start={new Date(2026, 3, 1)}
          end={new Date(2026, 5, 1)}
          cellWidth={60}
        />
      </div>
    </div>
  );
}

function LengthUnitGantt() {
  const data = useMemo(() => getData(), []);
  const options = [
    { id: 'minute', label: 'Minute' },
    { id: 'hour', label: 'Hour' },
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
  ];
  const [lengthUnit, setLengthUnit] = useState('day');

  const scales = useMemo(() => {
    switch (lengthUnit) {
      case 'minute':
        return [
          { unit: 'day', step: 1, format: '%M %j' },
          { unit: 'hour', step: 1, format: '%H:%i' },
        ];
      case 'hour':
        return [
          { unit: 'month', step: 1, format: '%M' },
          { unit: 'day', step: 1, format: '%M %j' },
        ];
      case 'day':
        return [
          { unit: 'month', step: 1, format: '%M' },
          { unit: 'week', step: 1, format: '%w' },
        ];
      case 'week':
        return [
          { unit: 'year', step: 1, format: '%Y' },
          { unit: 'month', step: 1, format: '%M' },
        ];
      case 'month':
        return [
          { unit: 'year', step: 1, format: '%Y' },
          { unit: 'quarter', step: 1, format: '%Q' },
        ];
      case 'quarter':
        return [{ unit: 'year', step: 1, format: '%Y' }];
      default:
        return bigScales;
    }
  }, [lengthUnit]);

  return (
    <div className="wx-VOqDTkHq demo">
      <div className="wx-VOqDTkHq bar">
        <Select
          value={lengthUnit}
          options={options}
          onChange={({ value }) => setLengthUnit(value)}
        />
      </div>
      <div className="wx-VOqDTkHq gantt">
        <Gantt
          tasks={data.tasks}
          links={data.links}
          scales={scales}
          lengthUnit={lengthUnit}
          cellWidth={300}
        />
      </div>
    </div>
  );
}

export default {
  title: 'Gantt/Scales',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Custom scale units and length units: register a "sprint" scale (~2-week periods), control minimum visible scale level, and switch between time length units.',
      },
    },
  },
};

export const CustomScaleUnit = {
  render: () => <CustomScaleUnitGantt />,
  parameters: { docs: { description: { story: 'A custom "sprint" scale unit registered via `registerScaleUnit`. Sprints split each month into two ~15-day halves. Zoom with Ctrl+wheel to see day-level detail.' } } },
};
export const MinScaleUnit = {
  render: () => <MinScaleUnitGantt />,
  parameters: { docs: { description: { story: 'Use the dropdown to control how many scale levels are visible (sprint only, month+sprint, +week, +day). Demonstrates dynamic scale configuration.' } } },
};
export const LengthUnit = {
  render: () => <LengthUnitGantt />,
  parameters: { docs: { description: { story: 'Switch the `lengthUnit` prop between minute, hour, day, week, month, and quarter. The scale configuration and cell width adapt to each unit.' } } },
};
