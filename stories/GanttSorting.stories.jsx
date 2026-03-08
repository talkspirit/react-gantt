import { useMemo, useState, useCallback } from 'react';
import { getData, zoomConfig } from '../demos/data';
import { Gantt } from '../src/';
import { Button } from '@svar-ui/react-core';
import '../demos/cases/GanttSort.css';
import '../demos/cases/GanttCustomSort.css';

function RestrictedSortGantt() {
  const data = useMemo(() => getData(), []);

  function init(api) {
    api.intercept('sort-tasks', (config) => {
      return config.key == 'text';
    });
  }

  return (
    <div className="wx-fr1PMpDW demo">
      <h4>Sorting by the &quot;Task Name&quot; column only</h4>
      <div className="wx-fr1PMpDW gtcell">
        <Gantt
          init={init}
          tasks={data.tasks}
          links={data.links}
          zoom={zoomConfig}
        />
      </div>
    </div>
  );
}

function CustomSortGantt() {
  const data = useMemo(() => getData(), []);
  const [gApi, setGApi] = useState(null);
  const [sortConfig, setSortConfig] = useState({});

  const getIcons = useCallback(() => {
    const obj = { text: '', start: '', duration: '' };
    const { key, order } = sortConfig;
    if (key) obj[key] = `wxi-arrow-${order == 'asc' ? 'up' : 'down'}`;
    return obj;
  }, [sortConfig]);
  const [icons, setIcons] = useState(() => getIcons());

  const sort = useCallback(
    (id) => {
      const { key, order } = sortConfig;
      let newOrder = !key ? 'desc' : 'asc';
      if (key === id) newOrder = order === 'asc' ? 'desc' : 'asc';
      // trigger sort via Gantt API
      if (gApi) gApi.exec('sort-tasks', { key: id, order: newOrder });
    },
    [gApi, sortConfig],
  );

  const init = useCallback((api) => {
    api.on('sort-tasks', (config) => {
      setSortConfig(config);
      const obj = { text: '', start: '', duration: '' };
      const { key, order } = config;
      if (key) obj[key] = `wxi-arrow-${order == 'asc' ? 'up' : 'down'}`;
      setIcons(obj);
    });
    setGApi(api);
  }, []);

  return (
    <div className="wx-q0L4gF4x rows">
      <div className="wx-q0L4gF4x bar">
        <div className="wx-q0L4gF4x label">Sort by</div>
        <Button onClick={() => sort('text')}>
          Task Name <i className={'wx-q0L4gF4x ' + icons.text}></i>
        </Button>
        <Button onClick={() => sort('start')}>
          Start Date <i className={'wx-q0L4gF4x ' + icons.start}></i>
        </Button>
        <Button onClick={() => sort('duration')}>
          Duration <i className={'wx-q0L4gF4x ' + icons.duration}></i>
        </Button>
      </div>
      <div className="wx-q0L4gF4x gtcell">
        <Gantt
          init={init}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
        />
      </div>
    </div>
  );
}

export default {
  title: 'Gantt/Sorting',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Task sorting: restrict which columns can be sorted, or build fully custom sort controls with external buttons.',
      },
    },
  },
};

export const Restricted = {
  render: () => <RestrictedSortGantt />,
  parameters: { docs: { description: { story: 'Only the "Task Name" column is sortable. Click column headers to test — sorting is intercepted and blocked for all columns except "text".' } } },
};
export const Custom = {
  render: () => <CustomSortGantt />,
  parameters: { docs: { description: { story: 'External sort buttons (Task Name, Start Date, Duration) that trigger sorting via `api.exec("sort-tasks")`. Arrow icons update to reflect current sort direction.' } } },
};
