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
import { BankAssetDetailStore } from './store';

export const BankAssetDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'BankAssetDetail'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showTransferOption, setShowTransferOption] = React.useState(false);
  const { deleteResponse, deleteBankAsset, clearDeleteError } =
    PortfolioDetailStore;

  React.useEffect(() => {
    BankAssetDetailStore.assignInfo(routeProps.params.info.id);
    BankAssetDetailStore.getTransactionList();
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
    BankAssetDetailStore.editBankAsset(newData);
  };

  const handleTransferToPortfolio = () => {
    console.log('Do thing');
  };

  const handleTransferToFund = () => {
    navigation.navigate('BankTransfer', { info: routeProps.params.info });
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
      <TransferOptions
        onTransferToFund={handleTransferToFund}
        onTransferPortfolio={handleTransferToPortfolio}
        show={showTransferOption}
        onClose={() => setShowTransferOption(!showTransferOption)}
      />
      <AssetSpeedDialButton
        onTransfer={() => setShowTransferOption(!showTransferOption)}
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
        variant="error"
        onDismiss={clearDeleteError}
        message={deleteResponse.errorMessage}
        show={deleteResponse.isError}
      />
    </PlatformView>
  );
});
