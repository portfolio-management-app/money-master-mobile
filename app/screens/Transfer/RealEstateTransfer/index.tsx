import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  CustomToast,
  PlatformView,
  RealEstateInformationCard,
  TransferForm,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { InvestFundStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.transferToFund;

export const RealEstateTransfer = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'RealEstateTransfer'>['route']>();

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
      const { id, inputCurrency } = routeProps.params.info;
      transferToFund(PortfolioDetailStore.information.id, {
        referentialAssetId: id,
        amount: amount,
        referentialAssetType: 'bankSaving',
        isTransferringAll: false,
        currencyCode: inputCurrency,
      });
    },
    [routeProps, transferToFund]
  );
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <RealEstateInformationCard asset={routeProps.params.info} />
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
