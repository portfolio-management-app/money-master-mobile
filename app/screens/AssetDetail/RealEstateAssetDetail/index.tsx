import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
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
import { RealEstateAssetDetailStore } from './store';

export const RealEstateAssetDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'RealEstateAssetDetail'>['route']>();
  const [showModal, setShowModal] = React.useState(false);
  const [showTransferOption, setShowTransferOption] = React.useState(false);

  const handleTransferToPortfolio = () => {
    setShowTransferOption(!setShowTransferOption);
  };

  React.useEffect(() => {
    RealEstateAssetDetailStore.assignInfo(routeProps.params.info.id);
  }, [routeProps]);

  const handleMenuItemPress = (type: AssetActionType) => {
    switch (type) {
      case 'edit':
        setShowModal(!showModal);
        break;
    }
  };

  const handleEditInformation = (newData: any) => {
    console.log('onedit');
    RealEstateAssetDetailStore.editAsset(newData);
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
