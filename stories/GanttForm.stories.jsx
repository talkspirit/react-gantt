import { useMemo, useState, useCallback } from 'react';
import { getData } from '../demos/data';
import { Gantt, defaultTaskTypes } from '../src/';
import Form from '../demos/custom/Form.jsx';
import '../demos/cases/GanttForm.css';

function CustomFormGantt() {
  const data = useMemo(() => getData(), []);
  const [task, setTask] = useState();
  const [gApi, setGApi] = useState();

  const formAction = useCallback(
    ({ action, data }) => {
      if (action === 'close-form') {
        setTask(null);
      } else {
        // dispatch action via Gantt API
        gApi.exec(action, data);
      }
    },
    [gApi],
  );

  const init = useCallback((api) => {
    api.intercept('show-editor', ({ id }) => {
      if (id) setTask(api.getState().tasks.byId(id));
      return false;
    });
    setGApi(api);
  }, []);

  return (
    <div className="wx-0moLF6Ul wrapper">
      <Gantt
        init={init}
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
      />
      {task ? (
        <Form task={task} taskTypes={defaultTaskTypes} onAction={formAction} />
      ) : null}
    </div>
  );
}

export default {
  title: 'Gantt/Form',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Replace the built-in editor with a completely custom form component.',
      },
    },
  },
};

export const CustomForm = {
  render: () => <CustomFormGantt />,
  parameters: { docs: { description: { story: 'Intercepts the `show-editor` event to display a custom React form instead of the default Editor. The form dispatches actions back to the Gantt via `api.exec()`.' } } },
};
