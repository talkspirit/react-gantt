import { useMemo, useState, useCallback, useEffect } from 'react';
import { getData, users } from '../demos/data';
import {
  Gantt,
  Editor,
  getEditorItems,
  registerEditorItem,
  defaultTaskTypes,
} from '../src/';
import { RadioButtonGroup } from '@svar-ui/react-core';
import UsersCustomCombo from '../demos/custom/UsersCustomCombo.jsx';
import AvatarCell from '../demos/custom/AvatarCell.jsx';

function EditorGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState(null);

  const init = useCallback((ganttApi) => {
    setApi(ganttApi);
    ganttApi.on('add-task', ({ id }) => {
      ganttApi.exec('show-editor', { id });
    });
  }, []);

  return (
    <>
      <Gantt
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        init={init}
      />
      {api && <Editor api={api} />}
    </>
  );
}

function EditorConfigGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState();

  const bottomBar = useMemo(
    () => ({
      items: [
        { comp: 'button', type: 'secondary', text: 'Close', id: 'close' },
        { comp: 'spacer' },
        { comp: 'button', type: 'danger', text: 'Delete', id: 'delete' },
        { comp: 'button', type: 'primary', text: 'Save', id: 'save' },
      ],
    }),
    [],
  );

  const keys = useMemo(
    () => ['text', 'type', 'start', 'end', 'duration', 'progress', 'details'],
    [],
  );

  const defaultEditorItems = useMemo(() => getEditorItems(), []);
  const items = useMemo(
    () => keys.map((key) => ({ ...defaultEditorItems.find((op) => op.key === key) })),
    [keys, defaultEditorItems],
  );

  return (
    <>
      <Gantt
        init={setApi}
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
      />
      {api && (
        <Editor
          api={api}
          items={items}
          bottomBar={bottomBar}
          topBar={false}
          placement="modal"
          autoSave={false}
        />
      )}
    </>
  );
}

function EditorReadonlyGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState();

  return (
    <>
      <Gantt
        init={setApi}
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
      />
      {api && <Editor api={api} readonly={true} topBar={true} />}
    </>
  );
}

function EditorValidationGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState();

  const items = useMemo(
    () =>
      getEditorItems().map((ed) => ({
        ...ed,
        ...(ed.comp === 'text' && { required: true }),
        ...(ed.comp === 'counter' && {
          validation: (v) => v <= 50,
          validationMessage: 'Task duration should not exceed 50 days',
        }),
      })),
    [],
  );

  return (
    <>
      <Gantt
        init={setApi}
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
      />
      {api && <Editor api={api} items={items} autoSave={false} />}
    </>
  );
}

function EditorCustomControlsGantt() {
  useEffect(() => {
    registerEditorItem('radio', RadioButtonGroup);
    registerEditorItem('custom-combo', UsersCustomCombo);
  }, []);

  const items = useMemo(() => {
    const defaultEditorItems = getEditorItems();
    const items = defaultEditorItems.map((item) => ({ ...item }));
    items.splice(
      defaultEditorItems.findIndex((d) => d.key === 'type'),
      1,
      {
        key: 'type',
        comp: 'radio',
        label: 'Type',
        options: defaultTaskTypes.map((o) => ({ ...o, value: o.id })),
        config: { type: 'inline' },
      },
      {
        key: 'assigned',
        comp: 'custom-combo',
        label: 'Assigned',
        options: users,
      },
    );
    items.forEach((d) => {
      if (d.comp === 'date') d.config = { time: true };
    });
    return items;
  }, []);

  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState();

  const columns = useMemo(
    () => [
      { id: 'text', header: 'Task name', width: 220 },
      { id: 'assigned', header: 'Assigned', width: 160, cell: AvatarCell },
      { id: 'start', header: 'Start Date', width: 100 },
    ],
    [],
  );

  return (
    <>
      <Gantt
        init={setApi}
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        lengthUnit="hour"
        columns={columns}
      />
      {api && <Editor api={api} items={items} />}
    </>
  );
}

export default {
  title: 'Gantt/Editor',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Side-panel editor for task properties: default config, custom field selection, readonly mode, validation rules, and custom input controls.',
      },
    },
  },
};

export const Default = {
  render: () => <EditorGantt />,
  parameters: { docs: { description: { story: 'Double-click a task to open the editor panel. New tasks auto-open the editor via the `add-task` event hook. Try adding and editing tasks.' } } },
};
export const Config = {
  render: () => <EditorConfigGantt />,
  parameters: { docs: { description: { story: 'Customized editor: specific fields only (text, type, start, end, duration, progress, details), custom bottom bar buttons (Close/Delete/Save), modal placement, no auto-save.' } } },
};
export const Readonly = {
  render: () => <EditorReadonlyGantt />,
  parameters: { docs: { description: { story: 'Editor in read-only mode — fields are visible but not editable. The top bar (close button) is shown.' } } },
};
export const Validation = {
  render: () => <EditorValidationGantt />,
  parameters: { docs: { description: { story: 'Text fields are required (cannot be empty). Duration has custom validation: must be <= 50 days. Auto-save is off — try saving invalid values to see error messages.' } } },
};
export const CustomControls = {
  render: () => <EditorCustomControlsGantt />,
  parameters: { docs: { description: { story: 'Custom editor controls: `RadioButtonGroup` for task type, a custom `UsersCustomCombo` for the "Assigned" field, and time-enabled date pickers.' } } },
};
