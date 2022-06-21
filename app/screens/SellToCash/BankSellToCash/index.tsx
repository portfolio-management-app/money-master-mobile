import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  BankInformationCard,
  ConfirmSheet,
  CustomToast,
  PlatformView,
  SellForm,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { BankAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { SellDataCallBack } from 'shared/types';

export const BankSellToCash = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'BankSellToCash'>['route']>();
  const [apiData, setApiData] = React.useState<SellDataCallBack>({
    amount: 0,
    fee: 0,
    tax: 0,
  });
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information } =
    BankAssetStore;

  const handleTransfer = () => {
    toggle();
    createTransaction({
      destinationAssetId: routeProps.params.cashDestination.id,
      destinationAssetType: 'cash',
      referentialAssetId: information.id,
      referentialAssetType: 'bankSaving',
      isTransferringAll: true,
      amountInDestinationAssetUnit: 0,
      amount: routeProps.params.source.inputMoneyAmount,
      currencyCode: information.inputCurrency,
      transactionType: 'withdrawToCash',
      fee: apiData.fee,
      tax: apiData.tax,
      isUsingFundAsSource: false,
      valueOfReferentialAssetBeforeCreatingTransaction:
        information.inputMoneyAmount,
    });
  };

  const handleSubmit = (data: SellDataCallBack) => {
    setApiData(data);
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${routeProps.params.source.name} ${APP_CONTENT.sellToCashScreen.header} ${routeProps.params.cashDestination.name}`}
      />
      <BankInformationCard asset={routeProps.params.source} />
      <SellForm
        buttonContent={APP_CONTENT.sellToCashScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.sellToCashScreen.inputPlaceHolder}
        haveAmountField={false}
        onSell={handleSubmit}
        initAmount={information.inputMoneyAmount}
        currency={information.inputCurrency}
      />
      <ConfirmSheet
        show={show}
        onCancel={toggle}
        onClose={toggle}
        onConfirm={handleTransfer}
        title={APP_CONTENT.sellToCashScreen.drawConfirm.title}
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
