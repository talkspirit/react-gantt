import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { getData } from '../demos/data';
import {
  Gantt,
  ContextMenu,
  Editor,
  defaultEditorItems,
  defaultTaskTypes,
} from '../src/';
import { useStoreLater } from '@svar-ui/lib-react';
import '../demos/cases/GanttSummariesProgress.css';

function NoDragGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState();

  const init = useCallback((api) => {
    setApi(api);
    api.intercept('drag-task', ({ id, top }) => {
      return !(typeof top === 'undefined' && api.getTask(id).type == 'summary');
    });
  }, []);

  return (
    <>
      <ContextMenu api={api}>
        <Gantt
          init={init}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
        />
      </ContextMenu>
      {api && <Editor api={api} />}
    </>
  );
}

function ConvertGantt() {
  const data = useMemo(() => getData(), []);
  const gApi = useRef(null);

  const toSummary = useCallback((id, self) => {
    const api = gApi.current;
    if (!api) return;
    const task = api.getTask(id);
    if (!self) id = task.parent;
    if (id && task.type !== 'summary') {
      api.exec('update-task', { id, task: { type: 'summary' } });
    }
  }, []);

  const toTask = useCallback((id) => {
    const api = gApi.current;
    if (!api) return;
    const obj = api.getTask(id);
    if (obj && !obj.data?.length) {
      api.exec('update-task', { id, task: { type: 'task' } });
    }
  }, []);

  const init = useCallback(
    (api) => {
      gApi.current = api;
      api.getState().tasks.forEach((task) => {
        if (task.data?.length) toSummary(task.id, true);
      });
      api.on('add-task', ({ id, mode }) => {
        if (mode === 'child') toSummary(id);
      });
      api.on('move-task', ({ id, source, mode, inProgress }) => {
        if (inProgress) return;
        if (mode == 'child') toSummary(id);
        else toTask(source);
      });
      api.on('delete-task', ({ source }) => toTask(source));
    },
    [toSummary, toTask],
  );

  const activeTaskId = useStoreLater(gApi.current, 'activeTask');

  const items = useMemo(() => {
    const api = gApi.current;
    const task = activeTaskId ? api?.getTask(activeTaskId) : null;
    if (task) {
      return defaultEditorItems.map((item) => {
        item = { ...item };
        if (item.comp === 'select' && item.key === 'type') {
          item.options =
            task.type !== 'summary'
              ? defaultTaskTypes.filter((t) => t.id !== 'summary')
              : [];
        }
        return item;
      });
    }
    return undefined;
  }, [activeTaskId]);

  return (
    <>
      <ContextMenu api={gApi.current}>
        <Gantt
          init={init}
          tasks={data.tasks}
          links={data.links}
          scales={data.scales}
        />
      </ContextMenu>
      {gApi.current && <Editor api={gApi.current} items={items} />}
    </>
  );
}

function ProgressGantt() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState();
  const [items, setItems] = useState(defaultEditorItems);

  const dayDiff = (next, prev) => {
    const d = (next - prev) / 1000 / 60 / 60 / 24;
    return Math.ceil(Math.abs(d));
  };

  function getSummaryProgress(id) {
    const [totalProgress, totalDuration] = collectProgressFromKids(id);
    const res = totalProgress / totalDuration;
    return isNaN(res) ? 0 : Math.round(res);
  }

  function collectProgressFromKids(id) {
    let totalProgress = 0,
      totalDuration = 0;
    const kids = api.getTask(id).data;
    kids?.forEach((kid) => {
      let duration = 0;
      if (kid.type !== 'milestone' && kid.type !== 'summary') {
        duration = kid.duration || dayDiff(kid.end, kid.start);
        totalDuration += duration;
        totalProgress += duration * kid.progress;
      }
      const [p, d] = collectProgressFromKids(kid.id);
      totalProgress += p;
      totalDuration += d;
    });
    return [totalProgress, totalDuration];
  }

  function recalcSummaryProgress(id, self) {
    const { tasks } = api.getState();
    const task = api.getTask(id);
    if (task.type != 'milestone') {
      const summary =
        self && task.type === 'summary' ? id : tasks.getSummaryId(id);
      if (summary) {
        const progress = getSummaryProgress(summary);
        // update summary progress via Gantt API
        api.exec('update-task', { id: summary, task: { progress } });
      }
    }
  }

  const recalcRef = useRef(null);
  recalcRef.current = recalcSummaryProgress;

  const init = useCallback((api) => {
    setApi(api);
    api.on('add-task', ({ id }) => recalcRef.current(id));
    api.on('update-task', ({ id }) => recalcRef.current(id));
    api.on('delete-task', ({ source }) => recalcRef.current(source, true));
    api.on('copy-task', ({ id }) => recalcRef.current(id));
    api.on('move-task', ({ id, source, inProgress }) => {
      if (inProgress) return;
      if (api.getTask(id).parent != source) recalcRef.current(source, true);
      recalcRef.current(id);
    });
    api.on('show-editor', ({ id }) => {
      if (id) {
        const type = api.getTask(id).type;
        setItems(
          defaultEditorItems.map((ed) => ({
            ...ed,
            ...(ed.key == 'progress' && {
              config: { disabled: type === 'summary' },
            }),
          })),
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!api) return;
    api.getState().tasks.forEach((task) => {
      recalcSummaryProgress(task.id, true);
    });
  }, [api]);

  return (
    <div className="wx-OeNgRLo4 wrapper">
      <ContextMenu api={api}>
        <div className="wx-OeNgRLo4 gt-cell">
          <Gantt
            init={init}
            tasks={data.tasks}
            links={data.links}
            scales={data.scales}
            cellWidth={30}
          />
        </div>
      </ContextMenu>
      {api && <Editor api={api} items={items} />}
    </div>
  );
}

export default {
  title: 'Gantt/Summaries',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Summary (parent) task behavior: drag prevention, auto-conversion to summary type, and auto-calculated progress from children.',
      },
    },
  },
};

export const NoDrag = {
  render: () => <NoDragGantt />,
  parameters: { docs: { description: { story: 'Summary tasks cannot be resized or moved horizontally (only reordered vertically). Uses `intercept("drag-task")` to block resize on summary type.' } } },
};
export const Convert = {
  render: () => <ConvertGantt />,
  parameters: { docs: { description: { story: 'Tasks auto-convert to summary type when they get children (via add-child or move-as-child). When all children are removed, they revert to regular tasks.' } } },
};
export const Progress = {
  render: () => <ProgressGantt />,
  parameters: { docs: { description: { story: 'Summary task progress is auto-calculated from children weighted by duration. Edit a child task progress to see the parent update. Summary progress fields are disabled in the editor.' } } },
};
