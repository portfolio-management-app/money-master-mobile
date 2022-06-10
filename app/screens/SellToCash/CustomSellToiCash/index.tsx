import React from 'react';
import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import {
  SellForm,
  ConfirmSheet,
  CustomToast,
  PlatformView,
  CustomAssetInformationCard,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { styleProvider } from 'shared/styles';
import { CustomAssetStore } from 'shared/stores';
import { SellDataCallBack } from 'shared/types';

export const CustomSellToCash = observer(() => {
  const [apiData, setApiData] = React.useState<SellDataCallBack>({
    amount: 0,
    fee: 0,
    tax: 0,
  });
  const routeProps =
    useRoute<RootStackScreenProps<'CustomSellToCash'>['route']>();
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information } =
    CustomAssetStore;

  const handleTransfer = () => {
    toggle();
    createTransaction({
      destinationAssetId: routeProps.params.cashDestination.id,
      destinationAssetType: 'cash',
      referentialAssetId: information.id,
      referentialAssetType: 'custom',
      isTransferringAll: false,
      amountInDestinationAssetUnit: 0,
      amount: apiData.amount,
      currencyCode: information.inputCurrency,
      transactionType: 'withdrawToCash',
      fee: apiData.fee,
      tax: apiData.tax,
      isUsingFundAsSource: false,
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
      <CustomAssetInformationCard asset={routeProps.params.source} />
      <SellForm
        buttonContent={APP_CONTENT.sellToCashScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.sellToCashScreen.inputPlaceHolder}
        onSell={handleSubmit}
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
