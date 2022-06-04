import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import {
  CustomToast,
  FloatingButton,
  Icon,
  PlatformView,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetGroup } from './components';

export const Holding = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { deleteResponse } = PortfolioDetailStore;

  const toggle = () => {
    navigation.navigate('AssetTypePicker');
  };

  return (
    <PlatformView style={[styleProvider.body]}>
      <AssetGroup />
      <FloatingButton onPress={toggle} placement="bottom-right">
        <Icon.Material color={colorScheme.white} size={25} name="add" />
      </FloatingButton>
      <CustomToast
        message={APP_CONTENT.assetDetail.deleteSuccess}
        show={deleteResponse.isSuccess}
        onDismiss={deleteResponse.deleteSuccess}
      />
    </PlatformView>
  );
});
