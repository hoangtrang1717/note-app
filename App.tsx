import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import ReduxProvider from './app/store';
// Navigation
import RootNavigation from './app/routes/RootNavigation';

let Root = function App() {
  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <RootNavigation />
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default Root;
