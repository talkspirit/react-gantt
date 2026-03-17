import { useMemo, useState } from 'react';
import { getData } from '../demos/data';
import { Gantt } from '../src/';
import { RadioButtonGroup } from '@svar-ui/react-core';
import '../demos/cases/ChartBorders.css';

function BasicGantt() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt tasks={data.tasks} links={data.links} scales={data.scales} />
  );
}

function ReadOnlyGantt() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      readonly={true}
    />
  );
}

function NoGridGantt() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      columns={[]}
    />
  );
}

function CellBordersGantt() {
  const data = useMemo(() => getData(), []);
  const [cellBorders, setCellBorders] = useState('full');
  const options = useMemo(
    () => [
      { id: 'full', label: 'Full' },
      { id: 'column', label: 'Column' },
    ],
    [],
  );

  return (
    <div className="wx-gnwCbZe9 rows">
      <div className="wx-gnwCbZe9 bar">
        <div className="wx-gnwCbZe9 label">Chart cell borders</div>
        <RadioButtonGroup
          options={options}
          value={cellBorders}
          onChange={({ value }) => setCellBorders(value)}
          type="inline"
        />
      </div>
      <div className="wx-gnwCbZe9 gtcell">
        <Gantt
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
          cellBorders={cellBorders}
        />
      </div>
    </div>
  );
}

export default {
  title: 'Gantt',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Core Gantt chart configurations demonstrating basic rendering, read-only mode, grid visibility, and cell border styles.',
      },
    },
  },
};

export const Basic = {
  render: () => <BasicGantt />,
  parameters: { docs: { description: { story: 'Minimal Gantt setup with tasks, links, and scales. This is the simplest working configuration — just data in, chart out.' } } },
};
export const ReadOnly = {
  render: () => <ReadOnlyGantt />,
  parameters: { docs: { description: { story: 'Gantt in read-only mode — tasks cannot be dragged, resized, or edited. Verify that all interactions are disabled.' } } },
};
export const NoGrid = {
  render: () => <NoGridGantt />,
  parameters: { docs: { description: { story: 'Gantt without the left-side grid panel (`columns={[]}`). Only the timeline chart area is rendered.' } } },
};
export const CellBorders = {
  render: () => <CellBordersGantt />,
  parameters: { docs: { description: { story: 'Toggle between "full" and "column" cell border styles in the chart area using the radio buttons.' } } },
};
