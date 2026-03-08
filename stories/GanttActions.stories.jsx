import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { getData } from '../demos/data';
import { Gantt, defaultColumns } from '../src/';
import { Field, Switch } from '@svar-ui/react-core';
import '../demos/cases/GanttPreventActions.css';

function PreventActionsGantt() {
  const data = useMemo(() => getData(), []);
  const [add, setAdd] = useState(true);
  const [drag, setDrag] = useState(true);
  const [order, setOrder] = useState(true);
  const [newLink, setNewLink] = useState(true);
  const [deleteLink, setDeleteLink] = useState(true);
  const [progress, setProgress] = useState(true);

  const dragRef = useRef(drag);
  const orderRef = useRef(order);
  useEffect(() => { dragRef.current = drag; }, [drag]);
  useEffect(() => { orderRef.current = order; }, [order]);

  const init = useCallback((gApi) => {
    gApi.intercept('drag-task', (ev) => {
      if (typeof ev.top !== 'undefined') return orderRef.current;
      return dragRef.current;
    });
  }, []);

  const columns = useMemo(
    () => add ? defaultColumns : defaultColumns.filter((a) => a.id != 'add-task'),
    [add],
  );

  return (
    <div className="wx-RPSbwjNq rows">
      <div className="wx-RPSbwjNq bar">
        <Field label="Adding tasks" position={'left'}>
          <Switch value={add} onChange={({ value }) => setAdd(value)} />
        </Field>
        <Field label="Creating links" position={'left'}>
          <Switch value={newLink} onChange={({ value }) => setNewLink(value)} />
        </Field>
        <Field label="Deleting links" position={'left'}>
          <Switch value={deleteLink} onChange={({ value }) => setDeleteLink(value)} />
        </Field>
        <Field label="Dragging tasks" position={'left'}>
          <Switch value={drag} onChange={({ value }) => setDrag(value)} />
        </Field>
        <Field label="Reordering tasks" position={'left'}>
          <Switch value={order} onChange={({ value }) => setOrder(value)} />
        </Field>
        <Field label="Editing progress" position={'left'}>
          <Switch value={progress} onChange={({ value }) => setProgress(value)} />
        </Field>
      </div>
      <div
        className={
          'wx-RPSbwjNq gantt' +
          (!newLink ? ' hide-links' : '') +
          (!deleteLink ? ' hide-delete-links' : '') +
          (!drag ? ' hide-drag' : '') +
          (!progress ? ' hide-progress' : '')
        }
      >
        <Gantt
          init={init}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default {
  title: 'Gantt/Actions',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Toggle individual user actions on/off to control what users can do in the Gantt chart.',
      },
    },
  },
};

export const PreventActions = {
  render: () => <PreventActionsGantt />,
  parameters: { docs: { description: { story: 'Use the switches to enable/disable each action: adding tasks, creating/deleting links, dragging, reordering, and editing progress. Observe how the chart UI changes — handles disappear, connectors hide, etc.' } } },
};
