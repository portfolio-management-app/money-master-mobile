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
import { CryptoAssetStore, PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType } from 'shared/types';
import { buildTransactionJSONForExcelFile } from 'utils/file';
import { EditModal, TabBarView } from './components';

const CONTENT = APP_CONTENT.assetDetail;

export const CryptoAssetDetail = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const routeProps =
    useRoute<RootStackScreenProps<'CoinAssetDetail'>['route']>();
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const {
    assignInfo,
    transactionList,
    getExcelData,
    information,
    editAsset,
    getInformation,
  } = CryptoAssetStore;
  const { deleteResponse, deleteCryptoAsset } = PortfolioDetailStore;

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
          type: 'crypto',
        });
        break;
    }
  };

  const handleEditInformation = (newData: any) => {
    editAsset(newData);
  };

  const handleTransferToInvestFund = () => {
    navigation.navigate('CryptoTransfer', { info: routeProps.params.info });
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(!showConfirm);
    const res = await deleteCryptoAsset(routeProps.params.info.id);
    if (res) {
      navigation.goBack();
    }
  };
  const handleCancelDelete = () => {
    setShowConfirm(!showConfirm);
  };

  const handleTransferToCash = () => {
    navigation.navigate('CashAssetPicker', {
      type: 'crypto',
      source: routeProps.params.info,
      actionType: 'SELL',
      transactionType: 'withdrawToCash',
      fromScreen: 'ASSET_DETAIL',
    });
  };
  const handleExportFile = () => {
    fileService.saveAssetDataFile(
      buildTransactionJSONForExcelFile(transactionList),
      getExcelData(),
      `${APP_CONTENT.transactionRecord} ${routeProps.params.info.name}`
    );
  };

  const handleAddValue = () => {
    navigation.navigate('ChooseBuySource', {
      type: 'crypto',
      asset: information,
      fromScreen: 'ASSET_DETAIL',
    });
  };

  const handleDraw = () => {
    navigation.navigate('DrawCrypto', {
      source: routeProps.params.info,
    });
  };

  const handleViewProfit = () => {
    navigation.navigate('CryptoAssetProfit');
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
      <EditModal
        onEdit={handleEditInformation}
        item={information}
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      />
      <AssetSpeedDialButton
        onBuy={handleAddValue}
        onExport={handleExportFile}
        onTransfer={handleTransferToInvestFund}
        onSell={handleTransferToCash}
        onDraw={handleDraw}
        onViewProfit={handleViewProfit}
      />
      <TabBarView />

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
