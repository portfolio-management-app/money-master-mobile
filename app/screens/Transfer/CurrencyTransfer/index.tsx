import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  CashInformationCard,
  CustomToast,
  PlatformView,
  TransferForm,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CashAssetStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.transferToFund;

export const CurrencyTransfer = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'CurrencyTransfer'>['route']>();

  const { transferToFund, transactionResponse } = CashAssetStore;
  const handleTransfer = React.useCallback(
    (amount: number) => {
      const { id, currencyCode } = routeProps.params.info;
      transferToFund(PortfolioDetailStore.information.id, {
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
      <CashInformationCard asset={routeProps.params.info} />
      <TransferForm onTransfer={handleTransfer} />
      <CustomToast
        show={transactionResponse.isSuccess}
        message={APP_CONTENT.transferToFund.success}
        onDismiss={transactionResponse.deleteSuccess}
      />
      <CustomToast
        variant="error"
        show={transactionResponse.isError}
        message={transactionResponse.errorMessage}
        onDismiss={transactionResponse.deleteError}
      />
      <TransparentLoading show={transactionResponse.pending} />
    </PlatformView>
  );
});
