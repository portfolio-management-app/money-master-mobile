import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import {
  BaseButton,
  ConfirmSheet,
  CustomToast,
  PlatformView,
  RealEstateInformationCard,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { RealEstateAssetStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';

export const DrawRealEstate = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'DrawRealEstate'>['route']>();
  const { show, toggle } = useConfirmSheet();
  const { createTransaction, transactionResponse, information } =
    RealEstateAssetStore;

  const handleTransfer = () => {
    toggle();
    createTransaction({
      destinationAssetId: null,
      destinationAssetType: null,
      referentialAssetId: information.id,
      referentialAssetType: 'cash',
      isTransferringAll: true,
      amountInDestinationAssetUnit: 0,
      amount: routeProps.params.source.inputMoneyAmount,
      currencyCode: information.inputCurrency,
      transactionType: 'withdrawToOutside',
      fee: 0,
      tax: 0,
      isUsingFundAsSource: false,
    });
  };

  const handleSubmit = () => {
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${APP_CONTENT.drawScreen.header} ${routeProps.params.source.name} `}
      />
      <RealEstateInformationCard asset={routeProps.params.source} />
      <BaseButton
        label={APP_CONTENT.drawScreen.buttonContent}
        onPress={handleSubmit}
        backgroundColor={colorScheme.theme}
        style={{
          marginHorizontal: 20,
        }}
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
