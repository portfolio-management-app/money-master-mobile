import { useNavigation, useRoute } from '@react-navigation/native';
import { Observer } from 'mobx-react-lite';
import { string } from 'mobx-state-tree/dist/internal';
import { NavigationHeader } from 'navigation/header';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { PlatformView, TextContainer } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { AddNewModal } from '../components';
import { CustomAssetStore, RequestDataType } from './store';

type Param = {
  name: string;
  key: string;
  params: {
    id: number;
    name: string;
  };
};

export const CustomCategory = () => {
  const navigateProps = useRoute<Param>();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (navigateProps.params) {
      CustomAssetStore.getAssetList(navigateProps.params.id);
    }
  }, [navigateProps]);
  const onCreate = (data: any) => {
    const requestData: RequestDataType = {
      name: data.values.assetName,
      inputCurrency: data.currency,
      inputMoneyAmount: parseInt(data.values.currentAsset),
      description: data.values.description,
      inputDay: data.startDate,
      interestRate: parseFloat(data.values.interestRate),
      termRange: data.interestVal,
    };
    console.log(requestData);
    CustomAssetStore.createNewAsset(navigateProps.params.id, requestData);
  };

  const gotoDetailScreen = (name: string, id: number) => {
    navigation.navigate(
      screenName.assetDetail as never,
      { name: name, id: id } as never
    );
  };

  return (
    <PlatformView style={styleProvider.bgBody}>
      <NavigationHeader title={navigateProps.params.name} />
      <Observer>
        {() => {
          const { assetList } = CustomAssetStore;
          return (
            <View style={{ marginTop: 10 }}>
              {assetList.map((asset, idx) => (
                <ListItem.Swipeable
                  onPress={() => gotoDetailScreen(asset.name, idx)}
                  style={{ marginBottom: 5 }}
                  bottomDivider
                  key={idx}
                  rightContent={
                    <Button
                      title="Delete"
                      icon={{ name: 'delete', color: 'white' }}
                      buttonStyle={{
                        backgroundColor: 'red',
                        minHeight: '90%',
                      }}
                    />
                  }
                >
                  <ListItem.Content>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <View style={styleProvider.assetTextContainer}>
                        <TextContainer type="h4" style={{ fontWeight: 'bold' }}>
                          {asset.name}
                        </TextContainer>
                        <View style={styles.textContainer}>
                          <TextContainer type="small">
                            Start date:{' '}
                          </TextContainer>
                          <TextContainer
                            style={{ color: colorScheme.theme }}
                            type="small"
                          >
                            {parseToString(new Date(asset.inputDay), false)}
                          </TextContainer>
                        </View>
                      </View>
                      <View style={styleProvider.assetTextContainer}>
                        <View style={styles.textContainer}>
                          <TextContainer type="small">Rate: </TextContainer>
                          <TextContainer
                            style={{
                              color: colorScheme.green200,
                            }}
                            type="small"
                          >
                            {asset.interestRate}%
                          </TextContainer>
                        </View>
                        <View style={styles.textContainer}>
                          <TextContainer type="small">
                            Current value:{' '}
                          </TextContainer>
                          <TextContainer
                            style={{
                              color: colorScheme.red500,
                            }}
                            type="small"
                          >
                            {asset.inputMoneyAmount} {asset.inputCurrency}
                          </TextContainer>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <ListItem.Chevron tvParallaxProperties={{}} />
                </ListItem.Swipeable>
              ))}
            </View>
          );
        }}
      </Observer>

      <AddNewModal onSubmit={onCreate} />
    </PlatformView>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
  },
});
