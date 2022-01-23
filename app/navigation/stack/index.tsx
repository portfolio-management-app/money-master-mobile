import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Authentication, Home } from 'screens';
import { SCREEN_NAME } from 'navigation/screenNames';

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={SCREEN_NAME.home}
      >
        <Stack.Screen name={SCREEN_NAME.home} component={Home} />
        <Stack.Screen name={SCREEN_NAME.login} component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
