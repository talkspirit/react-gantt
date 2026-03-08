import { useMemo } from 'react';
import { getData, zoomConfig } from '../demos/data';
import { Gantt } from '../src/';
import '../demos/cases/GanttZoom.css';
import '../demos/cases/GanttCustomZoom.css';

function ZoomGantt() {
  const data = useMemo(() => getData(), []);

  return (
    <div className="wx-HQBKHlAu demo">
      <h4>Point over Gantt chart, then hold Ctrl and use mouse wheel to zoom</h4>
      <div className="wx-HQBKHlAu gtcell">
        <Gantt
          tasks={data.tasks}
          links={data.links}
          cellWidth={100}
          zoom
        />
      </div>
    </div>
  );
}

function CustomZoomGantt() {
  const data = useMemo(() => getData(), []);

  return (
    <div className="wx-6q6Giv9n demo">
      <h4>Point over Gantt chart, then hold Ctrl and use mouse wheel to zoom</h4>
      <div className="wx-6q6Giv9n gtcell">
        <Gantt tasks={data.tasks} links={data.links} zoom={zoomConfig} />
      </div>
    </div>
  );
}

export default {
  title: 'Gantt/Zoom',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Mouse wheel zoom support for the Gantt timeline.',
      },
    },
  },
};

export const Default = {
  render: () => <ZoomGantt />,
  parameters: { docs: { description: { story: 'Hold Ctrl and scroll the mouse wheel over the chart area to zoom in/out. The default zoom uses built-in scale transitions.' } } },
};
export const CustomConfig = {
  render: () => <CustomZoomGantt />,
  parameters: { docs: { description: { story: 'Custom zoom configuration object controlling the zoom levels, min/max cell widths, and scale transitions at each level.' } } },
};
