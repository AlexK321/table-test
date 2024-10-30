import type { Preview } from '@storybook/react';
import { GlobalStyles, appTheme } from './../src/theme';
import { ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: appTheme.light,
      dark: appTheme.dark,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
