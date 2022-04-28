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
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType } from 'shared/types';
import {
  Information,
  TransactionList,
  PopoverMenu,
  EditModal,
} from './components';
import { CurrencyAssetDetailStore } from './store';

export const CurrencyAssetDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'CurrencyAssetDetail'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showTransferOption, setShowTransferOption] = React.useState(false);
  const { deleteResponse, deleteCashAsset, clearDeleteError } =
    PortfolioDetailStore;

  const handleTransferToPortfolio = () => {
    setShowTransferOption(!setShowTransferOption);
  };

  React.useEffect(() => {
    CurrencyAssetDetailStore.assignInfo(routeProps.params.info.id);
    CurrencyAssetDetailStore.getTransactionList();
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
    console.log('on edit');
    CurrencyAssetDetailStore.editAsset(newData);
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
      <TransactionList />
      <EditModal
        onEdit={handleEditInformation}
        item={routeProps.params.info}
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      />
      <AssetSpeedDialButton
        onTransfer={() => setShowTransferOption(!showTransferOption)}
      />
      <TransferOptions
        onTransferPortfolio={handleTransferToPortfolio}
        onTransferToFund={handleTransferToInvestFund}
        show={showTransferOption}
        onClose={() => setShowTransferOption(!showTransferOption)}
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
        onDismiss={clearDeleteError}
        variant="error"
        message={deleteResponse.errorMessage}
        show={deleteResponse.isError}
      />
    </PlatformView>
  );
});
