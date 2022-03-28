import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationHeader } from 'navigation/header';
import { TouchableOpacity } from 'react-native-ui-lib';
import {
  FloatingButton,
  Icon,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { COLOR, ITEMS, SIZE } from './constants';
import { RefreshControl, ScrollView, StatusBar } from 'react-native';
import { screenName } from 'navigation/screen-names';
import { CreateAssetRouteProps } from 'shared/types';
import { CreateModal } from './components';
import { Observer } from 'mobx-react-lite';
import { AssetTypeStore } from './store';

const SCREEN_CONTENT = APP_CONTENT.portfolioDetail;

export const AssetPicker = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    AssetTypeStore.getAssetTypeList();
  }, []);

  const navigateToCreate = (id: number, name: string) => {
    const param: CreateAssetRouteProps = { type: 'OTHER', name: name, id: id };
    switch (id) {
      case -1:
        param.type = 'CRYPTO';
        break;
      case -2:
        param.type = 'STOCK';
        break;
      case -3:
        param.type = 'BANKING';
        break;
      case -4:
        param.type = 'REAL-ESTATE';
        break;
      case -5:
        param.type = 'CASH';
        break;
    }
    navigation.navigate(screenName.createAsset as never, param as never);
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader title={SCREEN_CONTENT.assetPicker.title} />

      <Observer>
        {() => {
          const { assetTypeList, loading, getAssetTypeList } = AssetTypeStore;
          return (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => getAssetTypeList()}
                />
              }
            >
              {ITEMS.map((item) => (
                <TouchableOpacity
                  onPress={() => navigateToCreate(item.id, item.label)}
                  style={styleProvider.card}
                  key={item.id}
                >
                  {item.icon}
                  <TextContainer style={{ marginLeft: 20 }}>
                    {item.label}
                  </TextContainer>
                </TouchableOpacity>
              ))}
              {assetTypeList.map((assetType) => (
                <TouchableOpacity
                  onPress={() => navigateToCreate(assetType.id, assetType.name)}
                  style={styleProvider.card}
                  key={assetType.id}
                >
                  <Icon.Material
                    style={{ width: SIZE }}
                    size={SIZE}
                    color={COLOR}
                    name="psychology"
                  />
                  <TextContainer style={{ marginLeft: 20 }}>
                    {assetType.name}
                  </TextContainer>
                </TouchableOpacity>
              ))}
            </ScrollView>
          );
        }}
      </Observer>
      <FloatingButton onPress={() => setShowModal(!showModal)}>
        <Icon.Material color={colorScheme.white} size={25} name="add" />
      </FloatingButton>
      <CreateModal show={showModal} onClose={() => setShowModal(!showModal)} />
    </PlatformView>
  );
};
