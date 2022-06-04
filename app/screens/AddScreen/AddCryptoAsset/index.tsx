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
  SellForm,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { CryptoAssetStore, SourceBuyStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { SellDataCallBack } from 'shared/types';

export const AddCryptoAsset = observer(() => {
  const [apiData, setApiData] = React.useState<SellDataCallBack>({
    amount: 0,
    fee: 0,
    tax: 0,
  });
  const routeProps =
    useRoute<RootStackScreenProps<'CryptoSellToCash'>['route']>();
  const { show, toggle } = useConfirmSheet();
  const { sellToCash, transactionResponse, information, assignInfo } =
    CryptoAssetStore;
  const { usingCash, usingFund, cashId } = SourceBuyStore;

  React.useEffect(() => {
    assignInfo(routeProps.params.source);
  }, [routeProps.params.source, assignInfo]);

  const handleTransfer = () => {
    toggle();
    if (usingCash) {
      sellToCash({
        destinationAssetId: information.id,
        destinationAssetType: 'crypto',
        referentialAssetId: routeProps.params.cashDestination.id,
        referentialAssetType: 'cash',
        isTransferringAll: false,
        amountInDestinationAssetUnit: 0,
        amount: apiData.amount,
        currencyCode: information.currencyCode,
        transactionType: 'addValue',
        fee: apiData.fee,
        tax: apiData.tax,
      });
      return;
    }
    if (usingFund) {
      sellToCash({
        destinationAssetId: information.id,
        destinationAssetType: 'crypto',
        referentialAssetId: routeProps.params.cashDestination.id,
        referentialAssetType: 'cash',
        isTransferringAll: false,
        amountInDestinationAssetUnit: 0,
        amount: apiData.amount,
        currencyCode: information.currencyCode,
        transactionType: 'addValue',
        fee: apiData.fee,
        tax: apiData.tax,
      });
      return;
    }
  };

  const handleSubmit = (data: SellDataCallBack) => {
    setApiData(data);
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${routeProps.params.source.name} ${APP_CONTENT.drawScreen.header} ${routeProps.params.cashDestination.name}`}
      />
      <CryptoInformationCard asset={routeProps.params.source} />
      <SellForm
        buttonContent={APP_CONTENT.drawScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.drawScreen.inputPlaceHolder}
        onSell={handleSubmit}
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
