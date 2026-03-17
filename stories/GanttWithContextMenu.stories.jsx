import { useMemo, useState, useCallback, useRef, useContext } from 'react';
import { getData } from '../demos/data';
import { Gantt, ContextMenu, Editor, getMenuOptions } from '../src/';
import { Button, context } from '@svar-ui/react-core';
import '../demos/cases/DropDownMenu.css';

function ContextMenuGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState(null);

  return (
    <>
      <ContextMenu api={api}>
        <Gantt
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
          init={setApi}
        />
      </ContextMenu>
      {api && <Editor api={api} />}
    </>
  );
}

function ContextMenuHandlerGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState();

  const resolver = useCallback((id) => id > 2, []);

  const filter = useCallback((option, task) => {
    const type = task.type;
    if (option.id) {
      const ids = option.id.toString().split(':');
      if (type == 'milestone' && ids[0] == 'add-task') return ids[1] != 'child';
    }
    return true;
  }, []);

  return (
    <>
      <ContextMenu api={api} resolver={resolver} filter={filter}>
        <Gantt
          init={setApi}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
        />
      </ContextMenu>
      {api && <Editor api={api} />}
    </>
  );
}

function ContextMenuOptionsGantt() {
  const helpers = useContext(context.helpers);
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState();

  function actionHandler() {
    helpers.showNotice({ text: "'My action' clicked" });
  }

  const [options] = useState(() => {
    const ids = ['cut-task', 'copy-task', 'paste-task', 'delete-task'];
    let arr = [{ id: 'add-task:after', text: ' Add below', icon: 'wxi-plus' }];
    arr = arr.concat(getMenuOptions().filter((op) => ids.indexOf(op.id) >= 0));
    arr.push({
      id: 'my-action',
      text: 'My action',
      icon: 'wxi-empty',
      handler: actionHandler,
    });
    return arr;
  });

  function onClick({ context: ctx, action }) {
    if (!action.handler)
      helpers.showNotice({
        text: `'${action.id}' clicked for the '${ctx.id}' task`,
      });
  }

  return (
    <>
      <ContextMenu api={api} options={options} onClick={onClick}>
        <Gantt
          init={setApi}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
        />
      </ContextMenu>
      {api && <Editor api={api} />}
    </>
  );
}

function DropDownMenuGantt() {
  const apiRef = useRef(null);
  const [api, setApi] = useState(null);
  const menu = useRef(null);
  const data = useMemo(() => getData(), []);

  const resolver = useCallback(() => {
    const inst = apiRef.current;
    const selected = inst ? inst.getReactiveState().selected : null;
    const id =
      selected && selected.length ? selected[selected.length - 1] : null;
    return id ? inst.getTask(id) : null;
  }, []);

  return (
    <>
      <ContextMenu api={api} resolver={resolver} at="right" ref={menu} />
      <div className="wx-T6JFUSGo rows">
        <div className="wx-T6JFUSGo bar">
          <Button
            type="primary"
            onClick={(ev) => menu.current && menu.current.show(ev)}
          >
            Task action
          </Button>
        </div>
        <div className="wx-T6JFUSGo gtcell">
          <Gantt
            ref={(inst) => {
              apiRef.current = inst;
              setApi(inst);
            }}
            tasks={data.tasks}
            links={data.links}
            scales={data.scales}
          />
          {api && <Editor api={api} />}
        </div>
      </div>
    </>
  );
}

export default {
  title: 'Gantt/ContextMenu',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Right-click context menus: default menu, conditional filtering, custom options, and dropdown-style menu from a button.',
      },
    },
  },
};

export const Default = {
  render: () => <ContextMenuGantt />,
  parameters: { docs: { description: { story: 'Right-click any task to see the default context menu (add, delete, indent, etc.). Double-click to open the editor.' } } },
};
export const Handler = {
  render: () => <ContextMenuHandlerGantt />,
  parameters: { docs: { description: { story: 'Context menu with `resolver` (only tasks with id > 2 get a menu) and `filter` (milestones cannot add child tasks).' } } },
};
export const Options = {
  render: () => <ContextMenuOptionsGantt />,
  parameters: { docs: { description: { story: 'Custom menu options: a subset of default items plus a custom "My action" entry. The `onClick` handler shows a notice with the clicked action and task.' } } },
};
export const DropDown = {
  render: () => <DropDownMenuGantt />,
  parameters: { docs: { description: { story: 'Context menu triggered from a button instead of right-click. Select a task first, then click "Task action" to show the menu positioned at the button.' } } },
};
