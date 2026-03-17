import { useMemo, useState } from 'react';
import { getData, complexScales } from '../demos/data';
import { Gantt, HeaderMenu } from '../src/';
import { RadioButtonGroup, Slider } from '@svar-ui/react-core';
import AvatarCell from '../demos/custom/AvatarCell.jsx';
import NameAndDateCell from '../demos/custom/NameAndDateCell.jsx';
import AddTaskCell from '../demos/custom/AddTaskCell.jsx';
import '../demos/cases/GridHeaderMenu.css';
import '../demos/cases/GanttSizes.css';

function CustomCellsGantt() {
  const data = useMemo(() => getData(), []);
  const columns = useMemo(
    () => [
      { id: 'text', header: 'Task', width: 220, cell: NameAndDateCell },
      { id: 'assigned', header: 'Assigned', width: 160, cell: AvatarCell },
      { id: 'add-task', header: { cell: AddTaskCell }, align: 'center', width: 80 },
    ],
    [],
  );

  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      columns={columns}
      cellHeight={40}
    />
  );
}

function FixedColumnsGantt() {
  const data = useMemo(() => getData(), []);
  const columns = useMemo(
    () => [
      { id: 'text', header: 'Task name', width: 120 },
      { id: 'start', header: 'Start date', width: 120, align: 'center' },
      { id: 'duration', header: 'Duration', width: 90, align: 'center' },
      { id: 'add-task', header: 'Add task', width: 50, align: 'center' },
    ],
    [],
  );

  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      columns={columns}
    />
  );
}

function FlexColumnsGantt() {
  const data = useMemo(() => getData(), []);
  const columns = useMemo(
    () => [
      { id: 'text', header: 'Task name', flexgrow: 2 },
      { id: 'start', header: 'Start date', flexgrow: 1, align: 'center' },
      { id: 'duration', header: 'Duration', align: 'center', flexgrow: 1 },
      { id: 'add-task', header: 'Add task', width: 50, align: 'center' },
    ],
    [],
  );

  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      columns={columns}
    />
  );
}

function InlineEditorsGantt() {
  const data = useMemo(() => getData(), []);
  const columns = useMemo(
    () => [
      { id: 'text', header: 'Task name', width: 170, sort: true, editor: 'text' },
      { id: 'start', header: 'Start date', width: 120, align: 'center', sort: true, editor: 'datepicker' },
      { id: 'duration', header: 'Duration', width: 80, sort: true, align: 'center', editor: 'text' },
      { id: 'add-task', header: 'Add task', width: 50, align: 'center' },
    ],
    [],
  );

  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      columns={columns}
    />
  );
}

function HeaderMenuGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState(null);
  const [selected, setSelected] = useState('all');
  const options = [
    { id: 'all', label: 'All' },
    { id: 'some', label: 'Some' },
  ];
  const hidable = { start: true, duration: true };
  const columns = useMemo(
    () => (selected === 'some' ? hidable : null),
    [selected],
  );

  return (
    <div className="wx-DZzpn0qn rows">
      <div className="wx-DZzpn0qn bar">
        <div>Right-click the grid header and select visible columns</div>
        <div className="wx-DZzpn0qn bar">
          <div className="wx-DZzpn0qn label">Columns that can be hidden:</div>
          <RadioButtonGroup
            options={options}
            value={selected}
            onChange={({ value }) => setSelected(value)}
            type="inline"
          />
        </div>
      </div>
      <div className="wx-DZzpn0qn gtcell">
        <HeaderMenu api={api} columns={columns}>
          <Gantt
            init={setApi}
            tasks={data.tasks}
            links={data.links}
            scales={data.scales}
          />
        </HeaderMenu>
      </div>
    </div>
  );
}

function SizesGantt() {
  const data = useMemo(() => getData(), []);
  const [cellWidth, setCellWidth] = useState(100);
  const [scaleHeight, setScaleHeight] = useState(38);
  const [cellHeight, setCellHeight] = useState(36);

  return (
    <div className="wx-MZ5YXrqJ rows">
      <div className="wx-MZ5YXrqJ bar">
        <Slider label="Cell width" value={cellWidth} onChange={({ value }) => setCellWidth(value)} min={20} max={200} />
        <Slider label="Cell height" value={cellHeight} onChange={({ value }) => setCellHeight(value)} min={20} max={60} />
        <Slider label="Scale height" value={scaleHeight} onChange={({ value }) => setScaleHeight(value)} min={20} max={60} />
      </div>
      <div className="wx-MZ5YXrqJ gtcell">
        <Gantt
          tasks={data.tasks}
          links={data.links}
          scales={complexScales}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          scaleHeight={scaleHeight}
        />
      </div>
    </div>
  );
}

export default {
  title: 'Gantt/Grid',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Grid panel customization: custom cell renderers, column sizing (fixed/flex), inline editing, header context menu, and dimension controls.',
      },
    },
  },
};

export const CustomCells = {
  render: () => <CustomCellsGantt />,
  parameters: { docs: { description: { story: 'Custom cell renderers: `NameAndDateCell` shows task name + date, `AvatarCell` shows assigned user avatar, `AddTaskCell` provides a header button to add tasks.' } } },
};
export const FixedColumns = {
  render: () => <FixedColumnsGantt />,
  parameters: { docs: { description: { story: 'Grid columns with fixed pixel widths. Columns do not resize with the panel.' } } },
};
export const FlexColumns = {
  render: () => <FlexColumnsGantt />,
  parameters: { docs: { description: { story: 'Grid columns using `flexgrow` for proportional sizing. Columns stretch to fill available space.' } } },
};
export const InlineEditors = {
  render: () => <InlineEditorsGantt />,
  parameters: { docs: { description: { story: 'Click a grid cell to edit inline. Text columns use a text input, date columns use a datepicker. Column headers are also sortable.' } } },
};
export const WithHeaderMenu = {
  render: () => <HeaderMenuGantt />,
  parameters: { docs: { description: { story: 'Right-click the grid header to toggle column visibility. Use the radio buttons to control which columns can be hidden.' } } },
};
export const Sizes = {
  render: () => <SizesGantt />,
  parameters: { docs: { description: { story: 'Adjust `cellWidth`, `cellHeight`, and `scaleHeight` using sliders to see how dimensions affect the chart layout.' } } },
};
