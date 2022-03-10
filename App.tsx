import { NavigationStack } from 'navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';
import React from 'react';

const App = () => {
  return (
    <MenuProvider>
      <NavigationStack />
    </MenuProvider>
  );
};

export default App;
