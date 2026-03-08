import { useMemo, useState } from 'react';
import { getData } from '../demos/data';
import { Gantt, ContextMenu, Toolbar, Editor } from '../src/';
import { Segmented, Locale } from '@svar-ui/react-core';
import { cn } from '@svar-ui/gantt-locales';
import { cn as cnCore } from '@svar-ui/core-locales';
import '../demos/cases/GanttLocale.css';

function GanttWidget() {
  const [api, setApi] = useState(null);
  const data = useMemo(() => getData(), []);

  return (
    <>
      <Toolbar api={api} />
      <div className="wx-ycv5Oz8L gtcell">
        <ContextMenu api={api}>
          <Gantt
            tasks={data.tasks}
            links={data.links}
            scales={data.scales}
            zoom
            init={setApi}
          />
        </ContextMenu>
        {api && <Editor api={api} />}
      </div>
    </>
  );
}

function LocaleGantt() {
  const langs = [
    { id: 'en', label: 'EN' },
    { id: 'cn', label: 'CN' },
  ];
  const [lang, setLang] = useState('en');

  return (
    <div className="wx-ycv5Oz8L rows">
      <div className="wx-ycv5Oz8L bar">
        <Segmented
          options={langs}
          value={lang}
          onChange={({ value }) => setLang(value)}
        />
      </div>
      {lang === 'en' && <GanttWidget />}
      {lang === 'cn' && (
        <Locale words={{ ...cn, ...cnCore }}>
          <GanttWidget />
        </Locale>
      )}
    </div>
  );
}

export default {
  title: 'Gantt/Locale',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Internationalization: switch the entire Gantt UI between languages at runtime.',
      },
    },
  },
};

export const ChineseEnglish = {
  render: () => <LocaleGantt />,
  parameters: { docs: { description: { story: 'Toggle between English and Chinese using the segmented control. The Gantt, Toolbar, Editor, and ContextMenu all switch language via the `<Locale>` wrapper.' } } },
};
