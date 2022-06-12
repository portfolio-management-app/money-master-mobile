import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  ConfirmSheet,
  CryptoInformationCard,
  CustomToast,
  PlatformView,
  StockInformationCard,
  TransferForm,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { CryptoAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.transferToFund;

export const StockTransfer = observer(() => {
  const [amount, setAmount] = React.useState(0);
  const routeProps = useRoute<RootStackScreenProps<'StockTransfer'>['route']>();
  const { info } = routeProps.params;
  const { show, toggle } = useConfirmSheet();
  const { transferToFund, transactionResponse } = CryptoAssetStore;

  const handleTransfer = React.useCallback(() => {
    transferToFund({
      referentialAssetId: info.id,
      amount: amount,
      referentialAssetType: 'stock',
      isTransferringAll: false,
      currencyCode: info.currencyCode,
    });
  }, [amount, info.currencyCode, info.id, transferToFund]);
  const handleChangeAmount = (amount: number) => {
    setAmount(amount);
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <StockInformationCard asset={routeProps.params.info} />
      <TransferForm onTransfer={handleChangeAmount} />
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
      <ConfirmSheet
        show={show}
        onCancel={toggle}
        onClose={toggle}
        onConfirm={handleTransfer}
        title={CONTENT.confirm}
      />

      <TransparentLoading show={transactionResponse.pending} />
    </PlatformView>
  );
});
