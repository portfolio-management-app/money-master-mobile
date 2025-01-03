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
  const { assignInfo, getInformation, information, editAsset } =
    StockAssetStore;

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
      case 'notification-setting':
        navigation.navigate('NotificationSetting', {
          asset: information,
          type: 'stock',
        });
        break;
    }
  };

  const handleTransferToCash = () => {
    navigation.navigate('CashAssetPicker', {
      type: 'stock',
      source: routeProps.params.info,
      actionType: 'SELL',
      transactionType: 'withdrawToCash',
      fromScreen: 'ASSET_DETAIL',
    });
  };
  const handleEditInformation = (newData: any) => {
    editAsset(newData);
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

  const handleDraw = () => {
    navigation.navigate('DrawStock', {
      source: routeProps.params.info,
    });
  };

  const handleAddValue = () => {
    navigation.navigate('ChooseBuySource', {
      type: 'stock',
      asset: information,
      fromScreen: 'ASSET_DETAIL',
    });
  };

  const handleViewProfit = () => {
    navigation.navigate('StockAssetProfit');
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader
        title={information.name}
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
        onViewProfit={handleViewProfit}
        onExport={handleExportFile}
        onTransfer={handleTransferToInvestFund}
        onSell={handleTransferToCash}
        onDraw={handleDraw}
        onBuy={handleAddValue}
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
