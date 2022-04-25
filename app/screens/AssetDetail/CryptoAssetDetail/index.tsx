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
  PlatformView,
  TransferOptions,
} from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType } from 'shared/types';
import {
  Information,
  TransactionList,
  PopoverMenu,
  EditModal,
} from './components';
import { CryptoAssetDetailStore } from './store';

export const CryptoAssetDetail = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const routeProps =
    useRoute<RootStackScreenProps<'CoinAssetDetail'>['route']>();
  const [showModal, setShowModal] = React.useState(false);
  const [showTransferOption, setShowTransferOption] = React.useState(false);

  const { getTransactionList, assignInfo } = CryptoAssetDetailStore;

  React.useEffect(() => {
    assignInfo(routeProps.params.info.id);
    getTransactionList();
  }, [assignInfo, getTransactionList, routeProps]);
  const handleMenuItemPress = (type: AssetActionType) => {
    switch (type) {
      case 'edit':
        setShowModal(!showModal);
        break;
    }
  };

  const handleEditInformation = (newData: any) => {
    console.log('edit crypto asset', newData);
  };

  const handleTransferToPortfolio = () => {
    setShowTransferOption(!setShowTransferOption);
    navigation.navigate('PortfolioPicker', { type: 'TRANSFER' });
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
        show={showTransferOption}
        onClose={() => setShowTransferOption(!showTransferOption)}
      />
    </PlatformView>
  );
});
