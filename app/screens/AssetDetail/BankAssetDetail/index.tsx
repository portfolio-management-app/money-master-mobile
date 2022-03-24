import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native-ui-lib';
import { PlatformView, SpeedDial } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { IBankAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetActionType, ScreenParams } from 'shared/types';
import {
  Information,
  SpeedDialButtons,
  TransactionList,
  PopoverMenu,
  EditModal,
} from './components';
import { BankAssetDetailStore } from './store';

interface Param extends ScreenParams {
  params: {
    info: IBankAsset;
  };
}

export const BankAssetDetail = observer(() => {
  const routeProps = useRoute<Param>();
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    BankAssetDetailStore.assignInfo(routeProps.params.info.id);
  }, [routeProps]);

  const handleMenuItemPress = (type: AssetActionType) => {
    switch (type) {
      case 'edit':
        setShowModal(!showModal);
        break;
    }
  };

  const handleEditInformation = (newData: any) => {
    BankAssetDetailStore.editBankAsset(newData);
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader
        title={ASSET_DETAIL_CONTENT.headerBanking}
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
      <SpeedDial renderItems={() => <SpeedDialButtons />} />
    </PlatformView>
  );
});
