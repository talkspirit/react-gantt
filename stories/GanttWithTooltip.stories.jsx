import { useMemo, useState } from 'react';
import { getData } from '../demos/data';
import { Gantt, Tooltip } from '../src/';
import MyTooltipContent from '../demos/custom/MyTooltipContent.jsx';

function DefaultTooltip() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState(null);

  return (
    <Tooltip api={api}>
      <Gantt
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        init={setApi}
      />
    </Tooltip>
  );
}

function CustomContentTooltip() {
  const data = useMemo(() => getData(), []);
  const [api, setApi] = useState(null);

  return (
    <Tooltip api={api} content={MyTooltipContent}>
      <Gantt
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        init={setApi}
      />
    </Tooltip>
  );
}

export default {
  title: 'Gantt/Tooltip',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Hover tooltips for task bars, showing task details on mouseover.',
      },
    },
  },
};

export const Default = {
  render: () => <DefaultTooltip />,
  parameters: { docs: { description: { story: 'Wrap Gantt in `<Tooltip>` to show default task info (name, dates, progress) on hover over task bars.' } } },
};

export const CustomContent = {
  render: () => <CustomContentTooltip />,
  parameters: { docs: { description: { story: 'Pass a custom `content` component (`MyTooltipContent`) to the Tooltip to render fully custom tooltip markup.' } } },
};
