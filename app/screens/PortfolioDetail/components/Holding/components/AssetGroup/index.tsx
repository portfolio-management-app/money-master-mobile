import { observer } from 'mobx-react-lite';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import { TextContainer } from 'shared/components';
import { PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import {
  BankingCard,
  CashCard,
  CryptoCard,
  OtherCard,
  RealEstateCard,
  StockCard,
} from '../AssetCard';

const GROUP_NAMES = SCREEN_CONTENT.assetPicker;

export const AssetGroup = observer(() => {
  const {
    realEstateAssetList,
    bankAssetList,
    loading,
    getAllAsset,
    cryptoAssetList,
    stockAssetList,
    currencyAssetList,
    customAssetList,
  } = PortfolioDetailStore;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => getAllAsset()} />
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
          {currencyAssetList.map((currency) => (
            <CashCard key={currency.id} info={currency} />
          ))}
        </View>

        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.nft}
          </TextContainer>
          {cryptoAssetList.map((crypto) => (
            <CryptoCard key={crypto.id} item={crypto} />
          ))}
        </View>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.stock}
          </TextContainer>
          {stockAssetList.map((stock) => (
            <StockCard key={stock.id} item={stock} />
          ))}
        </View>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.realEstate}
          </TextContainer>

          {realEstateAssetList.map((item) => (
            <RealEstateCard key={item.id} item={item} />
          ))}
        </View>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.banking}
          </TextContainer>
          {bankAssetList.map((item) => (
            <BankingCard key={item.id} item={item} />
          ))}
        </View>
        {customAssetList.map((listItem) => (
          <View key={listItem.categoryId}>
            <TextContainer
              style={styleProvider.assetGroupName}
              bold
              color={colorScheme.black200}
            >
              {listItem.categoryName}
            </TextContainer>
            {listItem.assets.map((item) => (
              <OtherCard key={item.id} item={item} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
});
