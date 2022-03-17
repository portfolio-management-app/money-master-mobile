import React from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import { TextContainer } from 'shared/components';
import { ScrollStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { fakeData } from '../../fake-data';
import {
  BankingCard,
  CashCard,
  CryptoCard,
  RealEasterCard,
} from '../AssetCard';

const GROUP_NAMES = SCREEN_CONTENT.assetPicker;

export const AssetGroup = () => {
  const {
    renderCashItems,
    renderBankingItems,
    renderCryptoItems,
    renderRealEasterItems,
  } = getRenderArray();

  return (
    <ScrollView
      onScroll={(e: any) =>
        ScrollStore.changeOffset(e.nativeEvent.contentOffset.y)
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, paddingBottom: 100 }}>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.cash}
          </TextContainer>

          {renderCashItems.map((item) => item)}
        </View>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.nft}
          </TextContainer>
          {renderCryptoItems.map((item) => item)}
        </View>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.realEstate}
          </TextContainer>
          {renderRealEasterItems.map((item) => item)}
        </View>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.banking}
          </TextContainer>
          {renderBankingItems.map((item) => item)}
        </View>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.other}
          </TextContainer>
        </View>
      </View>
    </ScrollView>
  );
};

const getRenderArray = () => {
  const renderCashItems: Array<JSX.Element> = [];
  const renderCryptoItems: Array<JSX.Element> = [];
  const renderBankingItems: Array<JSX.Element> = [];
  const renderRealEasterItems: Array<JSX.Element> = [];
  fakeData.forEach((data: any) => {
    switch (data.groupName) {
      case 'Cash':
        data.items.forEach((item: any) => {
          renderCashItems.push(
            <CashCard
              key={item.id}
              id={item.id}
              name={item.name}
              value={item.value}
              description={item.description}
            />
          );
        });
        break;
      case 'Crypto currency':
        data.items.forEach((item: any) => {
          renderCryptoItems.push(
            <CryptoCard
              key={item.id}
              id={item.id}
              name={item.name}
              value={item.value}
              description={item.description}
              rate={item.rate}
            />
          );
        });
        break;
      case 'Real easter':
        data.items.forEach((item: any) => {
          renderRealEasterItems.push(
            <RealEasterCard
              key={item.id}
              id={item.id}
              name={item.name}
              value={item.value}
              description={item.description}
            />
          );
        });
        break;
      case 'Banking':
        data.items.forEach((item: any) => {
          renderBankingItems.push(
            <BankingCard
              key={item.id}
              id={item.id}
              name={item.name}
              value={item.value}
              description={item.description}
              rate={item.rate}
            />
          );
        });
        break;
    }
  });

  return {
    renderBankingItems,
    renderCashItems,
    renderCryptoItems,
    renderRealEasterItems,
  };
};
