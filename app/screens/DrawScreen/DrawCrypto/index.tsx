import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  AmountForm,
  ConfirmSheet,
  CryptoInformationCard,
  CustomToast,
  PlatformView,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { CryptoAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const DrawCrypto = observer(() => {
  const routeProps = useRoute<RootStackScreenProps<'DrawCrypto'>['route']>();
  const [amount, setAmount] = React.useState(0);
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information } =
    CryptoAssetStore;

  const handleTransfer = () => {
    toggle();
    console.log(amount);
    createTransaction({
      destinationAssetId: null,
      destinationAssetType: null,
      referentialAssetId: information.id,
      referentialAssetType: 'crypto',
      isTransferringAll: false,
      amountInDestinationAssetUnit: 0,
      amount: amount,
      currencyCode: information.currencyCode,
      transactionType: 'withdrawToOutside',
      fee: 0,
      tax: 0,
      isUsingFundAsSource: false,
    });
  };

  const handleSubmit = (amount: number) => {
    setAmount(amount);
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${APP_CONTENT.drawScreen.header} ${routeProps.params.source.name} `}
      />
      <CryptoInformationCard asset={routeProps.params.source} />
      <AmountForm
        buttonContent={APP_CONTENT.drawScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.drawScreen.inputPlaceHolder}
        onSubmit={handleSubmit}
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
