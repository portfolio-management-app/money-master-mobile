import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Login,
  Home,
  Start,
  Register,
  ForgetPassword,
  PortfolioDetail,
  BankAssetDetail,
  CoinDetail,
  AssetPicker,
  CreateAsset,
  StockDetail,
  CurrencyDetail,
  PortfolioPicker,
  BuyCrypto,
  BuyStock,
  BuyCurrency,
  RealEstateAssetDetail,
} from 'screens';
import { StatusBar } from 'react-native';
import { colorScheme } from 'shared/styles';
import { RootStackParamList } from 'navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationStack = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colorScheme.white} barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'Start'}
      >
        <Stack.Screen name={'Start'} component={Start} />
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Register'} component={Register} />
        <Stack.Screen name={'ForgetPassword'} component={ForgetPassword} />
        <Stack.Screen name={'PortfolioDetail'} component={PortfolioDetail} />
        <Stack.Screen name={'BankAssetDetail'} component={BankAssetDetail} />
        <Stack.Screen name={'CoinDetail'} component={CoinDetail} />
        <Stack.Screen name={'AssetTypePicker'} component={AssetPicker} />
        <Stack.Screen name={'CreateAsset'} component={CreateAsset} />
        <Stack.Screen name={'StockDetail'} component={StockDetail} />
        <Stack.Screen name={'CurrencyDetail'} component={CurrencyDetail} />
        <Stack.Screen name={'PortfolioPicker'} component={PortfolioPicker} />
        <Stack.Screen name={'BuyCrypto'} component={BuyCrypto} />
        <Stack.Screen name={'BuyStock'} component={BuyStock} />
        <Stack.Screen name={'BuyCurrency'} component={BuyCurrency} />

        <Stack.Screen
          name={'RealEstateAssetDetail'}
          component={RealEstateAssetDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
