import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  CashInformationCard,
  ConfirmSheet,
  CustomToast,
  PlatformView,
  SellForm,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { CashAssetStore, SourceBuyStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { SellDataCallBack } from 'shared/types';

export const AddCashAsset = observer(() => {
  const [apiData, setApiData] = React.useState<SellDataCallBack>({
    amount: 0,
    fee: 0,
    tax: 0,
  });
  const routeProps = useRoute<RootStackScreenProps<'AddCashAsset'>['route']>();
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information, assignInfo } =
    CashAssetStore;
  const { usingCash, usingFund, cashId } = SourceBuyStore;

  React.useEffect(() => {
    assignInfo(routeProps.params.source);
  }, [routeProps.params.source, assignInfo]);

  const handleTransfer = () => {
    toggle();
    if (usingCash) {
      createTransaction({
        destinationAssetId: information.id,
        destinationAssetType: 'cash',
        referentialAssetId: cashId,
        referentialAssetType: 'cash',
        isTransferringAll: false,
        amountInDestinationAssetUnit: 0,
        amount: apiData.amount,
        currencyCode: information.currencyCode,
        transactionType: 'addValue',
        fee: apiData.fee,
        tax: apiData.tax,
        isUsingFundAsSource: false,
      });
      return;
    }

    createTransaction({
      destinationAssetId: information.id,
      destinationAssetType: 'cash',
      referentialAssetId: null,
      referentialAssetType: null,
      isTransferringAll: false,
      amountInDestinationAssetUnit: apiData.amount,
      amount: apiData.amount,
      currencyCode: information.currencyCode,
      transactionType: 'addValue',
      fee: apiData.fee,
      tax: apiData.tax,
      isUsingFundAsSource: usingFund,
    });
  };

  const handleSubmit = (data: SellDataCallBack) => {
    setApiData(data);
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${APP_CONTENT.addScreen.header} ${routeProps.params.source.name}`}
      />
      <CashInformationCard asset={routeProps.params.source} />
      <SellForm
        buttonContent={APP_CONTENT.addScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.addScreen.inputPlaceHolderForCrypto}
        onSell={handleSubmit}
      />
      <ConfirmSheet
        show={show}
        onCancel={toggle}
        onClose={toggle}
        onConfirm={handleTransfer}
        title={APP_CONTENT.addScreen.drawConfirm.title}
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
