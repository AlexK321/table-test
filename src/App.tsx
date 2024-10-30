import { Provider } from 'react-redux';

import { AppErrorBoundary } from './components/ErrorBoundary';
import RootStore from './mobxStore/root-store';
import { RootStoreContext } from './mobxStore/root-store-context';
import { AppRoutes } from './pages';
import { store } from './store/store';
import { GlobalStyles } from './theme';

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
