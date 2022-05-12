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
  BuyGold,
  BuySilver,
  CryptoAssetDetail,
  StockAssetDetail,
  CustomAssetDetail,
  CryptoTransfer,
  StockTransfer,
  BankTransfer,
  RealEstateTransfer,
  CustomTransfer,
  CurrencyAssetDetail,
  CurrencyTransfer,
  SellCrypto,
  SellStock,
  SellCurrency,
  CashAssetPicker,
  DrawCrypto,
  DrawCash,
  DrawStock,
  DrawBank,
  DrawRealEstate,
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
        <Stack.Screen name={'BuyGold'} component={BuyGold} />
        <Stack.Screen name={'BuySilver'} component={BuySilver} />

        <Stack.Screen
          name={'RealEstateAssetDetail'}
          component={RealEstateAssetDetail}
        />
        <Stack.Screen name={'CoinAssetDetail'} component={CryptoAssetDetail} />
        <Stack.Screen name={'StockAssetDetail'} component={StockAssetDetail} />
        <Stack.Screen
          name={'CustomAssetDetail'}
          component={CustomAssetDetail}
        />
        <Stack.Screen
          name="CurrencyAssetDetail"
          component={CurrencyAssetDetail}
        />
        <Stack.Screen name="CryptoTransfer" component={CryptoTransfer} />
        <Stack.Screen name="StockTransfer" component={StockTransfer} />
        <Stack.Screen name="BankTransfer" component={BankTransfer} />

        <Stack.Screen
          name="RealEstateTransfer"
          component={RealEstateTransfer}
        />
        <Stack.Screen name="CustomTransfer" component={CustomTransfer} />
        <Stack.Screen name="CurrencyTransfer" component={CurrencyTransfer} />
        <Stack.Screen name="SellCrypto" component={SellCrypto} />
        <Stack.Screen name="SellStock" component={SellStock} />
        <Stack.Screen name="SellCurrency" component={SellCurrency} />
        <Stack.Screen name="CashAssetPicker" component={CashAssetPicker} />
        <Stack.Screen name="DrawCrypto" component={DrawCrypto} />
        <Stack.Screen name="DrawCash" component={DrawCash} />
        <Stack.Screen name="DrawStock" component={DrawStock} />
        <Stack.Screen name="DrawBank" component={DrawBank} />
        <Stack.Screen name="DrawRealEstate" component={DrawRealEstate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
