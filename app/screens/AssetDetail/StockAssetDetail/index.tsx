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
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore, StockAssetStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType } from 'shared/types';
import { buildTransactionJSONForExcelFile } from 'utils/file';
import { EditModal, TabBarView } from './components';

const CONTENT = APP_CONTENT.assetDetail;

export const StockAssetDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'StockAssetDetail'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const { deleteResponse, deleteStockAsset } = PortfolioDetailStore;
  const { assignInfo, getTransactionList, getInformation } = StockAssetStore;

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

  const handleTransferToCash = () => {
    navigation.navigate('CashAssetPicker', {
      type: 'STOCK',
      source: routeProps.params.info,
      actionType: 'SELL',
      transactionType: 'withdrawToCash',
      fromScreen: 'ASSET_DETAIL',
    });
  };
  const handleEditInformation = (newData: any) => {
    console.log('edit stock asset', newData);
  };
  const handleTransferToInvestFund = () => {
    navigation.navigate('StockTransfer', {
      info: routeProps.params.info,
    });
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(!showConfirm);
    const res = await deleteStockAsset(routeProps.params.info.id);
    if (res) {
      navigation.goBack();
    }
  };
  const handleCancelDelete = () => {
    setShowConfirm(!showConfirm);
  };
  const handleExportFile = () => {
    console.log('export');
    fileService.saveAssetDataFile(
      buildTransactionJSONForExcelFile(StockAssetStore.transactionList),
      StockAssetStore.getExcelData(),
      `${APP_CONTENT.transactionRecord} ${routeProps.params.info.name}`
    );
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader
        title={routeProps.params.info.name}
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
        item={routeProps.params.info}
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      />
      <AssetSpeedDialButton
        onExport={handleExportFile}
        onTransfer={handleTransferToInvestFund}
        onSell={handleTransferToCash}
      />

      <ConfirmSheet
        title={CONTENT.deleteTitle}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
        onCancel={handleCancelDelete}
        show={showConfirm}
      />
      <TransparentLoading show={deleteResponse.pending} />
      <CustomToast
        variant="error"
        onDismiss={deleteResponse.deleteError}
        message={deleteResponse.errorMessage}
        show={deleteResponse.isError}
      />
    </PlatformView>
  );
});
