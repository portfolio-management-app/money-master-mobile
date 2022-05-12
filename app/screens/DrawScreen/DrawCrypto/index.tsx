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
  TransferForm,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { CryptoAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const DrawCrypto = observer(() => {
  const [amount, setAmount] = React.useState(0);
  const routeProps = useRoute<RootStackScreenProps<'DrawCrypto'>['route']>();
  const { show, toggle } = useConfirmSheet();
  const { transferAsset, transactionResponse } = CryptoAssetStore;

  const handleTransfer = () => {
    toggle();
    transferAsset(
      {
        destinationAssetId: routeProps.params.cashDestination.id,
        destinationAssetType: 'cash',
        isTransferringAll: false,
        amount: amount,
        currencyCode: routeProps.params.cashDestination.currencyCode,
        transactionType: 'withdrawValue',
      },
      routeProps.params.source.id
    );
  };

  const handleSubmit = (amount: number) => {
    setAmount(amount);
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${routeProps.params.source.name} ${APP_CONTENT.drawScreen.header} ${routeProps.params.cashDestination.name}`}
      />
      <CryptoInformationCard asset={routeProps.params.source} />
      <TransferForm
        buttonContent={APP_CONTENT.drawScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.drawScreen.inputPlaceHolder}
        onTransfer={handleSubmit}
      />
      <ConfirmSheet
        show={show}
        onCancel={toggle}
        onClose={toggle}
        onConfirm={handleTransfer}
        title={APP_CONTENT.drawScreen.drawConfirm.title}
      />
      <CustomToast
        show={transactionResponse.isError}
        variant="error"
        message={transactionResponse.errorMessage}
        onDismiss={transactionResponse.deleteError}
      />
      <CustomToast
        show={transactionResponse.isSuccess}
        message={APP_CONTENT.transferToFund.success}
        onDismiss={transactionResponse.deleteSuccess}
      />
    </PlatformView>
  );
});
