import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { NotificationSettingStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';
import { PriceHighSetting, PriceLowSetting } from './components';
import { getAssetCommonInfo } from './helper';

const CONTENT = APP_CONTENT.assetNotificationSetting;

export const AssetNotificationSetting = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'NotificationSetting'>['route']>();

  const { getSetting, setting, loading } = NotificationSettingStore;

  React.useEffect(() => {
    getSetting(
      routeProps.params.asset.id,
      routeProps.params.asset.portfolioId,
      routeProps.params.type
    );
  }, [getSetting, routeProps]);

  const { currencyCode, currentPrice } = getAssetCommonInfo(
    routeProps.params.asset,
    routeProps.params.type
  );

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.navigationHeader} />
      <TextContainer bold mb={20} ml={40} mt={10}>
        {CONTENT.currentPrice}:{' '}
        <TextContainer color={colorScheme.theme}>
          {formatCurrency(currentPrice, currencyCode)}
        </TextContainer>
      </TextContainer>
      <PriceHighSetting
        asset={routeProps.params.asset}
        type={routeProps.params.type}
        setting={setting}
      />
      <PriceLowSetting
        asset={routeProps.params.asset}
        type={routeProps.params.type}
        setting={setting}
      />
      <TransparentLoading show={loading} />
    </PlatformView>
  );
});
