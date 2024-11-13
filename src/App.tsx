// eslint-disable-next-line
import * as Sentry from '@sentry/react';
import { Provider } from 'react-redux';

import { AppErrorBoundary } from './components/ErrorBoundary';
import RootStore from './mobxStore/root-store';
import { RootStoreContext } from './mobxStore/root-store-context';
import { AppRoutes } from './pages';
import { store } from './store/store';
import { GlobalStyles } from './theme';

Sentry.init({
  dsn: 'https://bd28d3f774d0ecb923ce778bf2d33a76@o4508212087816192.ingest.de.sentry.io/4508212094435408',
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const App = () => (
  <AppErrorBoundary>
    <RootStoreContext.Provider value={new RootStore()}>
      <Provider store={store}>
        <AppRoutes />
        <GlobalStyles />
      </Provider>
    </RootStoreContext.Provider>
  </AppErrorBoundary>
);

export default App;
