import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Login,
  Home,
  Start,
  Register,
  ForgetPassword,
  InterestAssets,
  NonInterestAssets,
} from 'screens';
import { screenName } from 'navigation/screen-names';

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={screenName.start}
      >
        <Stack.Screen name={screenName.start} component={Start} />
        <Stack.Screen name={screenName.home} component={Home} />
        <Stack.Screen name={screenName.login} component={Login} />
        <Stack.Screen name={screenName.register} component={Register} />
        <Stack.Screen
          name={screenName.forgetPassword}
          component={ForgetPassword}
        />
        <Stack.Screen
          name={screenName.interestAssets}
          component={InterestAssets}
        />
        <Stack.Screen
          name={screenName.nonInterestAssets}
          component={NonInterestAssets}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
