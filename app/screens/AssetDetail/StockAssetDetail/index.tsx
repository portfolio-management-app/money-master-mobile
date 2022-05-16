import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native-ui-lib';
import {
  AssetSpeedDialButton,
  ConfirmSheet,
  CustomToast,
  PlatformView,
  TransferOptions,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore, StockAssetStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType } from 'shared/types';
import { Information, Transaction, PopoverMenu, EditModal } from './components';

const CONTENT = APP_CONTENT.assetDetail;

export const StockAssetDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'StockAssetDetail'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showTransferOption, setShowTransferOption] = React.useState(false);

  const { deleteResponse, deleteStockAsset } = PortfolioDetailStore;

  React.useEffect(() => {
    StockAssetStore.assignInfo(routeProps.params.info.id);
    StockAssetStore.getTransactionList();
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

  const handleDraw = () => {
    navigation.navigate('CashAssetPicker', {
      type: 'STOCK',
      source: routeProps.params.info,
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

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader
        title={routeProps.params.info.name}
        renderRightItem={() => <PopoverMenu onPress={handleMenuItemPress} />}
      />
      <View style={styleProvider.container}>
        <Information info={routeProps.params.info} />
      </View>
      <Transaction />
      <EditModal
        onEdit={handleEditInformation}
        item={routeProps.params.info}
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      />
      <AssetSpeedDialButton
        onDraw={handleDraw}
        onTransfer={() => setShowTransferOption(!showTransferOption)}
      />
      <TransferOptions
        onTransferToFund={handleTransferToInvestFund}
        show={showTransferOption}
        onClose={() => setShowTransferOption(!showTransferOption)}
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
