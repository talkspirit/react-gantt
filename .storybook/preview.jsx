import { Globals } from '@svar-ui/react-core';
import Willow from '../src/themes/Willow.jsx';
import WillowDark from '../src/themes/WillowDark.jsx';

import '@svar-ui/react-core/style.css';
import '@svar-ui/react-grid/style.css';
import '@svar-ui/react-editor/style.css';
import '@svar-ui/react-menu/style.css';
import '@svar-ui/react-toolbar/style.css';

const themes = {
  willow: Willow,
  'willow-dark': WillowDark,
};

const withTheme = (Story, context) => {
  const themeId = context.globals.theme || 'willow';
  const ThemeComponent = themes[themeId];

  return (
    <Globals>
      <ThemeComponent>
        <div
          data-wx-portal-root="true"
          style={{ height: '100vh', overflow: 'auto' }}
        >
          <Story />
        </div>
      </ThemeComponent>
    </Globals>
  );
};

const preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'willow', title: 'Willow Light' },
          { value: 'willow-dark', title: 'Willow Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'willow',
  },
  decorators: [withTheme],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default preview;
