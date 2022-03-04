import { NavigationStack } from 'navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';
import React from 'react';
import { Assets } from 'react-native-ui-lib';
console.log('Loaded asset', Assets);

const App = () => {
  return (
    <MenuProvider>
      <NavigationStack />
    </MenuProvider>
  );
};

export default App;
