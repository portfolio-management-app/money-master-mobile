import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { fileService } from 'services/file-service';
import {
  AssetSpeedDialButton,
  ConfirmSheet,
  CustomToast,
  PlatformView,
  PopoverMenuSetting,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT, ASSET_DETAIL_CONTENT } from 'shared/constants';
import { PortfolioDetailStore, RealEstateAssetStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType } from 'shared/types';
import { buildTransactionJSONForExcelFile } from 'utils/file';
import { EditModal, TabBarView } from './components';

export const RealEstateAssetDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'RealEstateAssetDetail'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showConfirmTransfer, setShowConfirmTransfer] = React.useState(false);
  const { deleteResponse, deleteRealEstateAsset } = PortfolioDetailStore;
  const {
    transferToFund,
    transactionResponse,
    information: assetInformation,
    assignInfo,
    getTransactionList,
    getInformation,
  } = RealEstateAssetStore;

  React.useEffect(() => {
    assignInfo(routeProps.params.info);
    getTransactionList();
    getInformation();
  }, [routeProps, assignInfo, getTransactionList, getInformation]);

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
    RealEstateAssetStore.editAsset(newData);
  };

  const handleTransferToFund = () => {
    transferToFund({
      referentialAssetId: routeProps.params.info.id,
      referentialAssetType: 'realEstate',
      isTransferringAll: true,
      amount: 0,
      currencyCode: routeProps.params.info.inputCurrency,
    });
    setShowConfirmTransfer(!showConfirmTransfer);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(!showConfirm);
    const res = await deleteRealEstateAsset(routeProps.params.info.id);
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
      type: 'realEstate',
      source: routeProps.params.info,
      actionType: 'SELL',
      transactionType: 'withdrawToCash',
      fromScreen: 'ASSET_DETAIL',
    });
  };

  const handleExportFile = () => {
    console.log('export');
    fileService.saveAssetDataFile(
      buildTransactionJSONForExcelFile(RealEstateAssetStore.transactionList),
      RealEstateAssetStore.getExcelData(),
      `${APP_CONTENT.transactionRecord} ${routeProps.params.info.name}`
    );
  };

  const handleDraw = () => {
    navigation.navigate('DrawRealEstate', {
      source: routeProps.params.info,
    });
  };

  const handleAddValue = () => {
    navigation.navigate('ChooseBuySource', {
      type: 'realEstate',
      asset: assetInformation,
      fromScreen: 'ASSET_DETAIL',
    });
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader
        title={assetInformation.name}
        renderRightItem={
          <PopoverMenuSetting
            haveNotificationSetting
            onPress={handleMenuItemPress}
          />
        }
      />
      <TabBarView />
      <EditModal
        onEdit={handleEditInformation}
        item={assetInformation}
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      />

      <AssetSpeedDialButton
        onExport={handleExportFile}
        onTransfer={() => setShowConfirmTransfer(!showConfirmTransfer)}
        onSell={handleTransferToCash}
        onDraw={handleDraw}
        onBuy={handleAddValue}
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
