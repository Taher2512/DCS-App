import React from 'react';
import Navigation from './src/navigation';
import {persistor, store} from './src/store';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <Navigation />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
