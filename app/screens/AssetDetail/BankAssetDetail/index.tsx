import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import {
  AssetSpeedDialButton,
  ConfirmSheet,
  CustomToast,
  PlatformView,
  PopoverMenuSetting,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT, ASSET_DETAIL_CONTENT } from 'shared/constants';
import { BankAssetStore, PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType } from 'shared/types';
import { fileService } from 'services/file-service';
import { EditModal, TabBarView } from './components';
import { buildTransactionJSONForExcelFile } from 'utils/file';

export const BankAssetDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'BankAssetDetail'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showConfirmTransfer, setShowConfirmTransfer] = React.useState(false);

  const { deleteResponse, deleteBankAsset } = PortfolioDetailStore;
  const {
    assignInfo,
    transactionList,
    transactionResponse,
    getInformation,
    editAsset,
    createTransaction,
    information,
  } = BankAssetStore;

  React.useEffect(() => {
    assignInfo(routeProps.params.info);
    getInformation();
  }, [routeProps, assignInfo, getInformation]);

  const handleMenuItemPress = (type: AssetActionType) => {
    switch (type) {
      case 'edit':
        setShowModal(!showModal);
        break;
      case 'delete':
        setShowConfirm(!showConfirm);
        break;
    }
  };

  const handleEditInformation = (newData: any) => {
    editAsset(newData);
  };
  const handleTransferToFund = () => {
    setShowConfirmTransfer(!showConfirmTransfer);
    createTransaction({
      destinationAssetId: null,
      destinationAssetType: 'fund',
      referentialAssetId: information.id,
      referentialAssetType: 'bankSaving',
      isTransferringAll: true,
      amountInDestinationAssetUnit: 0,
      amount: information.inputMoneyAmount,
      currencyCode: information.inputCurrency,
      transactionType: 'moveToFund',
      fee: 0,
      tax: 0,
      isUsingFundAsSource: false,
      valueOfReferentialAssetBeforeCreatingTransaction:
        information.inputMoneyAmount,
    });
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(!showConfirm);
    const res = await deleteBankAsset(routeProps.params.info.id);
    if (res) {
      navigation.goBack();
    }
  };
  const handleCancelDelete = () => {
    setShowConfirm(!showConfirm);
  };

  const handleCancelTransfer = () => {
    setShowConfirmTransfer(!showConfirmTransfer);
  };

  const handleTransferToCash = () => {
    navigation.navigate('CashAssetPicker', {
      type: 'bankSaving',
      source: routeProps.params.info,
      actionType: 'SELL',
      transactionType: 'withdrawToCash',
      fromScreen: 'ASSET_DETAIL',
    });
  };

  const handleExportFile = () => {
    console.log('export');
    fileService.saveAssetDataFile(
      buildTransactionJSONForExcelFile(transactionList),
      [],
      `${APP_CONTENT.transactionRecord} ${routeProps.params.info.name}`
    );
  };
  const handleDraw = () => {
    navigation.navigate('DrawBank', {
      source: routeProps.params.info,
    });
  };
  const handleAddValue = () => {
    navigation.navigate('ChooseBuySource', {
      type: 'bankSaving',
      asset: information,
      fromScreen: 'ASSET_DETAIL',
    });
  };

  const handleViewProfit = () => {
    navigation.navigate('BankAssetProfit');
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader
        title={information.name}
        renderRightItem={<PopoverMenuSetting onPress={handleMenuItemPress} />}
      />
      <TabBarView />
      <EditModal
        onEdit={handleEditInformation}
        item={information}
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      />
      <AssetSpeedDialButton
        onSell={handleTransferToCash}
        onTransfer={() => setShowConfirmTransfer(!showConfirmTransfer)}
        onExport={handleExportFile}
        onDraw={handleDraw}
        onBuy={handleAddValue}
        onViewProfit={handleViewProfit}
      />
      <ConfirmSheet
        title={ASSET_DETAIL_CONTENT.deleteTitle}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
        onCancel={handleCancelDelete}
        show={showConfirm}
      />
      <ConfirmSheet
        show={showConfirmTransfer}
        title={ASSET_DETAIL_CONTENT.transferConfirm}
        onConfirm={handleTransferToFund}
        onCancel={handleCancelTransfer}
        onClose={handleCancelTransfer}
      />
      <TransparentLoading
        show={deleteResponse.pending || transactionResponse.pending}
      />
      <CustomToast
        variant="error"
        onDismiss={deleteResponse.deleteError}
        message={deleteResponse.errorMessage}
        show={deleteResponse.isError}
      />
      <CustomToast
        variant="error"
        onDismiss={transactionResponse.deleteError}
        message={transactionResponse.errorMessage}
        show={transactionResponse.isError}
      />
      <CustomToast
        onDismiss={transactionResponse.deleteSuccess}
        message={APP_CONTENT.transferToFund.success}
        show={transactionResponse.isSuccess}
      />
    </PlatformView>
  );
});
