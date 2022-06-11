import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  AmountForm,
  ConfirmSheet,
  CustomAssetInformationCard,
  CustomToast,
  PlatformView,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { CustomAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const DrawCustom = observer(() => {
  const routeProps = useRoute<RootStackScreenProps<'DrawCustom'>['route']>();
  const [amount, setAmount] = React.useState(0);
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information } =
    CustomAssetStore;

  const handleTransfer = () => {
    toggle();
    createTransaction({
      destinationAssetId: null,
      destinationAssetType: null,
      referentialAssetId: information.id,
      referentialAssetType: 'custom',
      isTransferringAll: true,
      amountInDestinationAssetUnit: 0,
      amount: amount,
      currencyCode: information.inputCurrency,
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
      <CustomAssetInformationCard asset={routeProps.params.source} />
      <AmountForm
        buttonContent={APP_CONTENT.drawScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.drawScreen.inputPlaceHolder}
        onSubmit={handleSubmit}
        currency={information.inputCurrency}
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
