import React from 'react';
import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import {
  BaseButton,
  ConfirmSheet,
  CustomToast,
  PlatformView,
  RealEstateInformationCard,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { useConfirmSheet } from 'shared/hooks';
import { colorScheme, styleProvider } from 'shared/styles';
import { RealEstateAssetStore } from 'shared/stores';

export const DrawRealEstate = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'DrawRealEstate'>['route']>();
  const { show, toggle } = useConfirmSheet();
  const { transferAsset, transactionResponse } = RealEstateAssetStore;

  const handleTransfer = () => {
    toggle();
    transferAsset(
      {
        destinationAssetId: routeProps.params.cashDestination.id,
        destinationAssetType: 'cash',
        isTransferringAll: true,
        amount: routeProps.params.source.inputMoneyAmount,
        currencyCode: routeProps.params.cashDestination.currencyCode,
        transactionType: 'withdrawValue',
      },
      routeProps.params.source.id
    );
  };

  const handleSubmit = () => {
    toggle();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${routeProps.params.source.name} ${APP_CONTENT.drawScreen.header} ${routeProps.params.cashDestination.name}`}
      />
      <RealEstateInformationCard asset={routeProps.params.source} />
      <BaseButton
        style={{ marginHorizontal: 20, marginTop: 20 }}
        backgroundColor={colorScheme.theme}
        onPress={handleSubmit}
        label={APP_CONTENT.drawScreen.buttonContent}
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
