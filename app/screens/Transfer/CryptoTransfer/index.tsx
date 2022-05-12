import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  CryptoInformationCard,
  CustomToast,
  PlatformView,
  TransferForm,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { InvestFundStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.transferToFund;

export const CryptoTransfer = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'CryptoTransfer'>['route']>();
  const { info } = routeProps.params;
  const {
    transferToFund,
    clearError,
    dispatchSuccess,
    errorMessage,
    isSuccess,
    isError,
    loading,
  } = InvestFundStore;

  console.log(info);

  const handleTransfer = React.useCallback(
    (amount: number) => {
      transferToFund(PortfolioDetailStore.information.id, {
        referentialAssetId: info.id,
        amount: amount,
        referentialAssetType: 'crypto',
        isTransferringAll: false,
        currencyCode: info.currencyCode,
      });
    },
    [info, transferToFund]
  );
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <CryptoInformationCard asset={routeProps.params.info} />
      <TransferForm onTransfer={handleTransfer} />
      <CustomToast
        show={isSuccess}
        message={CONTENT.success}
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
