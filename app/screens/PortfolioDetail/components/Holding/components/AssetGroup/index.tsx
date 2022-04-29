import { observer } from 'mobx-react-lite';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SkeletonView, View } from 'react-native-ui-lib';
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
        <View style={styleProvider.assetGroup}>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.cash}
          </TextContainer>
          {loading ? (
            <SkeletonView
              template={SkeletonView.templates.LIST_ITEM}
              showContent={true}
            />
          ) : (
            <>
              {currencyAssetList.map((currency) => (
                <CashCard key={currency.id} info={currency} />
              ))}
            </>
          )}
        </View>

        <View style={styleProvider.assetGroup}>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.nft}
          </TextContainer>
          {loading ? (
            <SkeletonView
              template={SkeletonView.templates.LIST_ITEM}
              showContent={true}
            />
          ) : (
            <>
              {cryptoAssetList.map((crypto) => (
                <CryptoCard key={crypto.id} item={crypto} />
              ))}
            </>
          )}
        </View>
        <View style={styleProvider.assetGroup}>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.stock}
          </TextContainer>
          {loading ? (
            <SkeletonView
              template={SkeletonView.templates.LIST_ITEM}
              showContent={true}
            />
          ) : (
            <>
              {stockAssetList.map((stock) => (
                <StockCard key={stock.id} item={stock} />
              ))}
            </>
          )}
        </View>
        <View style={styleProvider.assetGroup}>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.realEstate}
          </TextContainer>
          {loading ? (
            <SkeletonView
              template={SkeletonView.templates.LIST_ITEM}
              showContent={true}
            />
          ) : (
            <>
              {realEstateAssetList.map((item) => (
                <RealEstateCard key={item.id} item={item} />
              ))}
            </>
          )}
        </View>
        <View style={styleProvider.assetGroup}>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.banking}
          </TextContainer>
          {loading ? (
            <SkeletonView
              template={SkeletonView.templates.LIST_ITEM}
              showContent={true}
            />
          ) : (
            <>
              {bankAssetList.map((item) => (
                <BankingCard key={item.id} item={item} />
              ))}
            </>
          )}
        </View>
        {customAssetList.map((listItem) => (
          <View style={styleProvider.assetGroup} key={listItem.categoryId}>
            <TextContainer
              style={styleProvider.assetGroupName}
              bold
              color={colorScheme.black200}
            >
              {listItem.categoryName}
            </TextContainer>
            {loading ? (
              <SkeletonView
                template={SkeletonView.templates.LIST_ITEM}
                showContent={true}
              />
            ) : (
              <>
                {listItem.assets.map((item) => (
                  <OtherCard key={item.id} item={item} />
                ))}
              </>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
});
