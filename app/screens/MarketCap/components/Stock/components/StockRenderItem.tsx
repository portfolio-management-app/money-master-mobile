import { useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { StockDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { IStockItem } from '../store/model';

interface IProps {
  renderInfo: ListRenderItemInfo<IStockItem>;
}

export const StockRenderItem = ({ renderInfo }: IProps) => {
  const navigation = useNavigation();
  const gotoStockDetail = async () => {
    await StockDetailStore.getStockData(renderInfo.item.symbol, '1h');
    navigation.navigate(screenName.stockDetail as never);
  };
  return (
    <TouchableOpacity onPress={gotoStockDetail} style={styleProvider.card}>
      <TextContainer bold mr={10}>
        {renderInfo.item.symbol}
      </TextContainer>
      <TextContainer>{renderInfo.item.name}</TextContainer>
    </TouchableOpacity>
  );
};
