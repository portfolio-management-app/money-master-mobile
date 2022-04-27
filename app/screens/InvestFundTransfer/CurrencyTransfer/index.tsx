import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { View } from 'react-native';
import {
  CustomToast,
  PlatformView,
  TextContainer,
  TransferForm,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { InvestFundStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.transferToFund;

export const CurrencyTransfer = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'CurrencyTransfer'>['route']>();

  const {
    transferToFund,
    clearError,
    dispatchSuccess,
    errorMessage,
    isSuccess,
    isError,
    loading,
  } = InvestFundStore;

  const handleTransfer = React.useCallback(
    (amount: number) => {
      const { id, currencyCode } = routeProps.params.info;
      transferToFund(PortfolioDetailStore.id, {
        referentialAssetId: id,
        amount: amount,
        referentialAssetType: 'cash',
        isTransferringAll: false,
        currencyCode: currencyCode,
      });
    },
    [routeProps, transferToFund]
  );
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <View>
        <TextContainer></TextContainer>
      </View>
      <TransferForm onTransfer={handleTransfer} />
      <CustomToast
        show={isSuccess}
        message={APP_CONTENT.transferToFund.success}
        onDismiss={() => dispatchSuccess()}
      />
      <CustomToast
        variant="error"
        show={isError}
        message={errorMessage}
        onDismiss={() => clearError()}
      />
      <TransparentLoading show={loading} />
    </PlatformView>
  );
});
