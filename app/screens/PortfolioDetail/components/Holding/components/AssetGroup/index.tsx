import { observer } from 'mobx-react-lite';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import { TextContainer } from 'shared/components';
import { PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { BankingCard, RealEstateCard } from '../AssetCard';

const GROUP_NAMES = SCREEN_CONTENT.assetPicker;

export const AssetGroup = observer(() => {
  const { realEstateAssetList, bankAssetList, loading, getAllAsset } =
    PortfolioDetailStore;

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
        </View>
        <View>
          <TextContainer
            style={styleProvider.assetGroupName}
            bold
            color={colorScheme.black200}
          >
            {GROUP_NAMES.nft}
          </TextContainer>
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
});
