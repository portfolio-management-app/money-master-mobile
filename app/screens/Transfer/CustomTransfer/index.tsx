import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import {
  ConfirmSheet,
  CustomAssetInformationCard,
  CustomToast,
  PlatformView,
  TransferForm,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { CustomAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.transferToFund;

export const CustomTransfer = observer(() => {
  const [amount, setAmount] = React.useState(0);
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information } =
    CustomAssetStore;

  const handleTransfer = React.useCallback(() => {
    toggle();
    createTransaction({
      destinationAssetId: null,
      valueOfReferentialAssetBeforeCreatingTransaction:
        information.inputMoneyAmount,
      destinationAssetType: 'fund',
      referentialAssetId: information.id,
      referentialAssetType: 'custom',
      isTransferringAll: false,
      amountInDestinationAssetUnit: 0,
      amount: amount,
      currencyCode: information.inputCurrency,
      transactionType: 'moveToFund',
      fee: 0,
      tax: 0,
      isUsingFundAsSource: false,
    });
  }, [
    toggle,
    createTransaction,
    information.inputMoneyAmount,
    information.id,
    information.inputCurrency,
    amount,
  ]);
  const handleChangeAmount = (amount: number) => {
    setAmount(amount);
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <CustomAssetInformationCard asset={information} />
      <TransferForm
        inputPlaceHolder={`${CONTENT.amount} (${information.inputCurrency})`}
        onTransfer={handleChangeAmount}
      />
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
