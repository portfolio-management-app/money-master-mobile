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
  VolatilityAssets,
  CastAssets,
  RealEstateAssets,
  Coin,
  Bank,
  CustomCategory,
  AssetDetail,
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
          name={screenName.volatilityAssets}
          component={VolatilityAssets}
        />
        <Stack.Screen
          name={screenName.realEstateAssets}
          component={RealEstateAssets}
        />
        <Stack.Screen name={screenName.cashAssets} component={CastAssets} />
        <Stack.Screen name={screenName.coin} component={Coin} />
        <Stack.Screen name={screenName.bank} component={Bank} />
        <Stack.Screen
          name={screenName.customCategory}
          component={CustomCategory}
        />
        <Stack.Screen name={screenName.assetDetail} component={AssetDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
