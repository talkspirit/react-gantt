import { useMemo, useState, useCallback, useContext } from 'react';
import { getData } from '../demos/data';
import { Gantt, Toolbar, Editor, getToolbarButtons } from '../src/';
import { Toolbar as BaseToolbar } from '@svar-ui/react-toolbar';
import { context } from '@svar-ui/react-core';
import { useStoreLater } from '@svar-ui/lib-react';
import '../demos/cases/GanttToolbarButtons.css';
import '../demos/cases/GanttToolbarCustom.css';

function ToolbarGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState(null);

  return (
    <>
      <Toolbar api={api} />
      <Gantt
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        init={setApi}
      />
      {api && <Editor api={api} />}
    </>
  );
}

function CustomButtonsGantt() {
  const helpers = useContext(context.helpers);
  const [api, setApi] = useState();
  const data = useMemo(() => getData(), []);

  const actionHandler = useCallback(() => {
    helpers.showNotice({ text: "'My action' clicked" });
  }, [helpers]);

  const items = useMemo(() => {
    const items = getToolbarButtons().filter((b) => {
      return b.id?.indexOf('indent') === -1;
    });
    items.push({
      id: 'my-action',
      comp: 'icon',
      icon: 'wxi-cat',
      handler: actionHandler,
    });
    return items;
  }, [actionHandler]);

  return (
    <>
      <Toolbar api={api} items={items} />
      <div className="wx-vkht5Uhi gtcell">
        <Gantt
          init={setApi}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
        />
        {api && <Editor api={api} />}
      </div>
    </>
  );
}

function CustomToolbarGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState(null);
  const selectedValue = useStoreLater(api, 'selected');

  function handleAdd() {
    if (!api) return;
    // add a new task via the Gantt API
    api.exec('add-task', {
      task: { text: 'New task' },
      target: selectedValue[0],
      mode: 'after',
    });
  }

  function handleDelete() {
    if (!api) return;
    const order = getActionOrder(true);
    order.forEach((id) => api.exec('delete-task', { id }));
  }

  function handleMove(mode) {
    if (!api) return;
    const changeDir = mode === 'down';
    const order = getActionOrder(changeDir);
    order.forEach((id) => api.exec('move-task', { id, mode }));
  }

  function getActionOrder(changeDir) {
    if (!api) return [];
    const tasks = selectedValue
      .map((id) => api.getTask(id))
      .sort((a, b) => a.$level - b.$level || a.$y - b.$y);
    const idOrder = tasks.map((o) => o.id);
    if (changeDir) return idOrder.reverse();
    return idOrder;
  }

  const allItems = [
    { comp: 'button', type: 'primary', text: 'Add task', handler: handleAdd },
    { comp: 'button', text: 'Delete task', handler: handleDelete },
    { comp: 'button', type: 'primary', text: 'Move task down', handler: () => handleMove('down') },
    { comp: 'button', type: 'primary', text: 'Move task up', handler: () => handleMove('up') },
  ];

  const items = useMemo(() => {
    if (api && selectedValue) {
      return selectedValue.length ? allItems : [allItems[0]];
    }
    return [allItems[0]];
  }, [api, selectedValue, allItems]);

  return (
    <>
      <BaseToolbar items={items} />
      <div className="wx-7sTOb4gt gtcell">
        <Gantt
          init={setApi}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
        />
        {api && <Editor api={api} />}
      </div>
    </>
  );
}

export default {
  title: 'Gantt/Toolbar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Toolbar integration: default toolbar, custom button sets, and fully custom toolbar with add/delete/move operations.',
      },
    },
  },
};

export const Default = {
  render: () => <ToolbarGantt />,
  parameters: { docs: { description: { story: 'The built-in `<Toolbar>` component with default buttons (add, undo, redo, indent, etc.). Double-click a task to open the Editor.' } } },
};
export const CustomButtons = {
  render: () => <CustomButtonsGantt />,
  parameters: { docs: { description: { story: 'Customized toolbar buttons using `getToolbarButtons()` — indent buttons are filtered out and a custom "cat" icon button is added.' } } },
};
export const CustomToolbar = {
  render: () => <CustomToolbarGantt />,
  parameters: { docs: { description: { story: 'A fully custom toolbar using `@svar-ui/react-toolbar` directly. Buttons for Add, Delete, Move Up, Move Down appear based on task selection state.' } } },
};
