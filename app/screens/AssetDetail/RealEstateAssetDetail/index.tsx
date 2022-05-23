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
  TransferOptions,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT, ASSET_DETAIL_CONTENT } from 'shared/constants';
import {
  InvestFundStore,
  PortfolioDetailStore,
  RealEstateAssetStore,
} from 'shared/stores';
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
  const [showTransferOption, setShowTransferOption] = React.useState(false);
  const { deleteResponse, deleteRealEstateAsset, information } =
    PortfolioDetailStore;
  const {
    loading,
    transferToFund,
    isError,
    isSuccess,
    errorMessage,
    dispatchSuccess,
    clearError,
  } = InvestFundStore;

  React.useEffect(() => {
    RealEstateAssetStore.assignInfo(routeProps.params.info);
    RealEstateAssetStore.getTransactionList();
  }, [routeProps]);

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
    transferToFund(information.id, {
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
    setShowTransferOption(false);
    setShowConfirmTransfer(!showConfirmTransfer);
  };

  const handleTransferToCash = () => {
    navigation.navigate('CashAssetPicker', {
      type: 'REAL-ESTATE',
      source: routeProps.params.info,
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

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader
        title={routeProps.params.info.name}
        renderRightItem={<PopoverMenuSetting onPress={handleMenuItemPress} />}
      />
      <TabBarView />
      <EditModal
        onEdit={handleEditInformation}
        item={routeProps.params.info}
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      />
      <TransferOptions
        onTransferToFund={handleCancelTransfer}
        onTransferToCash={handleTransferToCash}
        show={showTransferOption}
        onClose={() => setShowTransferOption(!showTransferOption)}
      />
      <AssetSpeedDialButton
        onExport={handleExportFile}
        onTransfer={() => setShowTransferOption(!showTransferOption)}
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
      <TransparentLoading show={deleteResponse.pending || loading} />
      <CustomToast
        variant="error"
        onDismiss={deleteResponse.deleteError}
        message={deleteResponse.errorMessage}
        show={deleteResponse.isError}
      />
      <CustomToast
        variant="error"
        onDismiss={clearError}
        message={errorMessage}
        show={isError}
      />
      <CustomToast
        onDismiss={dispatchSuccess}
        message={APP_CONTENT.transferToFund.success}
        show={isSuccess}
      />
    </PlatformView>
  );
});
