import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  ConfirmSheet,
  CustomToast,
  PlatformView,
  SellForm,
  StockInformationCard,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { StockAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { SellDataCallBack } from 'shared/types';

export const StockSellToCash = observer(() => {
  const [apiData, setApiData] = React.useState<SellDataCallBack>({
    amount: 0,
    fee: 0,
    tax: 0,
  });
  const routeProps =
    useRoute<RootStackScreenProps<'StockSellToCash'>['route']>();
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information, assignInfo } =
    StockAssetStore;

  React.useEffect(() => {
    assignInfo(routeProps.params.source);
  }, [routeProps.params.source, assignInfo]);

  const handleSellToCash = () => {
    toggle();
    createTransaction({
      destinationAssetId: routeProps.params.cashDestination.id,
      destinationAssetType: 'cash',
      referentialAssetId: information.id,
      referentialAssetType: 'crypto',
      isTransferringAll: false,
      amountInDestinationAssetUnit: 0,
      amount: apiData.fee,
      currencyCode: information.currencyCode,
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
      <StockInformationCard asset={routeProps.params.source} />
      <SellForm
        buttonContent={APP_CONTENT.sellToCashScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.sellToCashScreen.inputPlaceHolder}
        onSell={handleSubmit}
      />
      <ConfirmSheet
        show={show}
        onCancel={toggle}
        onClose={toggle}
        onConfirm={handleSellToCash}
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
