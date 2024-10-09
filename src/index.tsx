import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { initializeIcons, ThemeProvider } from '@fluentui/react';
import { colors } from './Constants/colors';

initializeIcons();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider
      theme={{
        palette: { themePrimary: colors.green },
        semanticColors: {
          primaryButtonBackgroundHovered: colors.greenHover,
          primaryButtonBackgroundPressed: colors.green,
          inputBackgroundCheckedHovered: colors.greenHover
        }
      }}
    >
      <App />
    </ThemeProvider>
  </Provider>
);
