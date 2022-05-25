import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  CustomToast,
  PlatformView,
  StockInformationCard,
  TransferForm,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore, StockAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.transferToFund;

export const StockTransfer = observer(() => {
  const routeProps = useRoute<RootStackScreenProps<'StockTransfer'>['route']>();

  const { transferToFund, transactionResponse } = StockAssetStore;

  const handleTransfer = React.useCallback(
    (amount: number) => {
      const { id, currencyCode } = routeProps.params.info;
      transferToFund(PortfolioDetailStore.information.id, {
        referentialAssetId: id,
        amount: amount,
        referentialAssetType: 'stock',
        isTransferringAll: false,
        currencyCode: currencyCode,
      });
    },
    [routeProps, transferToFund]
  );
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <StockInformationCard asset={routeProps.params.info} />
      <TransferForm onTransfer={handleTransfer} />
      <CustomToast
        show={transactionResponse.isSuccess}
        message={CONTENT.success}
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
