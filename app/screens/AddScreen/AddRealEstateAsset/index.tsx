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
  RealEstateInformationCard,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { RealEstateAssetStore, SourceBuyStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { SellDataCallBack } from 'shared/types';

export const AddRealEstateAsset = observer(() => {
  const [apiData, setApiData] = React.useState<SellDataCallBack>({
    amount: 0,
    fee: 0,
    tax: 0,
  });
  const routeProps =
    useRoute<RootStackScreenProps<'AddRealEstateAsset'>['route']>();
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information, assignInfo } =
    RealEstateAssetStore;
  const { usingCash, usingFund, cashId } = SourceBuyStore;

  React.useEffect(() => {
    assignInfo(routeProps.params.source);
  }, [routeProps.params.source, assignInfo]);

  const handleTransfer = () => {
    toggle();
    if (usingCash) {
      createTransaction({
        destinationAssetId: information.id,
        destinationAssetType: 'realEstate',
        referentialAssetId: cashId,
        referentialAssetType: 'cash',
        isTransferringAll: false,
        amountInDestinationAssetUnit: apiData.amount,
        amount: apiData.amount,
        currencyCode: information.inputCurrency,
        transactionType: 'addValue',
        fee: apiData.fee,
        tax: apiData.tax,
        isUsingFundAsSource: false,
        valueOfReferentialAssetBeforeCreatingTransaction:
          information.inputMoneyAmount,
      });
      return;
    }

    createTransaction({
      destinationAssetId: information.id,
      destinationAssetType: 'realEstate',
      referentialAssetId: null,
      referentialAssetType: null,
      isTransferringAll: false,
      amountInDestinationAssetUnit: apiData.amount,
      amount: apiData.amount,
      currencyCode: information.inputCurrency,
      transactionType: 'addValue',
      fee: apiData.fee,
      tax: apiData.tax,
      isUsingFundAsSource: usingFund,
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
        title={`${APP_CONTENT.addScreen.header} ${routeProps.params.source.name}`}
      />
      <RealEstateInformationCard asset={routeProps.params.source} />
      <SellForm
        buttonContent={APP_CONTENT.addScreen.buttonContent}
        inputPlaceHolder={APP_CONTENT.addScreen.inputPlaceHolder}
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
