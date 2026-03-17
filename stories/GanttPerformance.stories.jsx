import { useState, useEffect, useRef } from 'react';
import { getGeneratedData, complexScales } from '../demos/data';
import { Gantt } from '../src/';
import { Button } from '@svar-ui/react-core';
import '../demos/cases/GanttPerformance.css';

function RenderTime({ start }) {
  const [label, setLabel] = useState('');
  const active = useRef(true);

  useEffect(() => {
    active.current = true;
    setTimeout(() => { active.current = false; }, 1000);
  }, [start]);

  useEffect(() => {
    window.__RENDER_METRICS_ENABLED__ = true;
    const handler = (e) => {
      if (!active.current) return;
      if (e.detail.label === 'chart') {
        setLabel((new Date() - start) + ' ms');
      }
    };
    window.addEventListener('render-metric', handler);
    return () => {
      delete window.__RENDER_METRICS_ENABLED__;
      window.removeEventListener('render-metric', handler);
    };
  }, [start]);

  return <span>{label}</span>;
}

const count = 10000;
const years = 3;
const data = getGeneratedData('', count, years);

function PerformanceGantt() {
  const [start, setStart] = useState(null);

  return (
    <div className="wx-KB3Eoqwm rows">
      <div className="wx-KB3Eoqwm row">
        {start ? (
          <>
            10 000 tasks ({years} years) rendered in{' '}
            <RenderTime start={start} />
          </>
        ) : (
          <Button type="primary" onClick={() => setStart(new Date())}>
            Press me to render Gantt chart with 10 000 tasks
          </Button>
        )}
      </div>
      {start ? (
        <div className="wx-KB3Eoqwm gtcell">
          <Gantt
            tasks={data.tasks}
            links={data.links}
            scales={complexScales}
          />
        </div>
      ) : null}
    </div>
  );
}

export default {
  title: 'Gantt/Performance',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Performance benchmark: rendering large datasets with virtual scrolling.',
      },
    },
  },
};

export const TenThousandTasks = {
  render: () => <PerformanceGantt />,
  parameters: { docs: { description: { story: 'Click the button to render 10,000 tasks spanning 3 years. Render time is measured and displayed. Tests virtual scrolling and rendering performance.' } } },
};
