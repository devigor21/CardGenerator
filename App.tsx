import { store } from './src/store/store';
import { Provider } from 'react-redux';

import Navigation from './src/navigation/Navigation';

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
