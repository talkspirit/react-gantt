const config = {
  stories: ['../stories/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Strip library-build externals — Storybook bundles everything itself
    if (config.build?.rollupOptions?.external) {
      delete config.build.rollupOptions.external;
    }
    return config;
  },
};
export default config;
