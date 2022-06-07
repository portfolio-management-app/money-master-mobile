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
import { CashAssetStore, PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType } from 'shared/types';
import { buildTransactionJSONForExcelFile } from 'utils/file';
import { EditModal, TabBarView } from './components';

export const CurrencyAssetDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'CurrencyAssetDetail'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const { deleteResponse, deleteCashAsset } = PortfolioDetailStore;
  const { information, assignInfo, getTransactionList, getInformation } =
    CashAssetStore;

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
    CashAssetStore.editAsset(newData);
  };
  const handleTransferToInvestFund = () => {
    navigation.navigate('CurrencyTransfer', { info: routeProps.params.info });
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(!showConfirm);
    const res = await deleteCashAsset(routeProps.params.info.id);
    if (res) {
      navigation.goBack();
    }
  };
  const handleCancelDelete = () => {
    setShowConfirm(!showConfirm);
  };

  const handleTransferToCash = () => {
    navigation.navigate('CashAssetPicker', {
      type: 'cash',
      source: routeProps.params.info,
      actionType: 'SELL',
      transactionType: 'withdrawToCash',
      fromScreen: 'ASSET_DETAIL',
    });
  };

  const handleExportFile = () => {
    console.log('export');
    fileService.saveAssetDataFile(
      buildTransactionJSONForExcelFile(CashAssetStore.transactionList),
      CashAssetStore.getExcelData(),
      `${APP_CONTENT.transactionRecord} ${routeProps.params.info.name}`
    );
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
        item={information}
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      />
      <AssetSpeedDialButton
        onExport={handleExportFile}
        onTransfer={handleTransferToInvestFund}
        onSell={handleTransferToCash}
      />

      <ConfirmSheet
        title={ASSET_DETAIL_CONTENT.deleteTitle}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
        onCancel={handleCancelDelete}
        show={showConfirm}
      />
      <TransparentLoading show={deleteResponse.pending} />
      <CustomToast
        onDismiss={deleteResponse.deleteError}
        variant="error"
        message={deleteResponse.errorMessage}
        show={deleteResponse.isError}
      />
    </PlatformView>
  );
});
