import { useRoute } from '@react-navigation/native';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { PlatformView, ScrollTabView } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';

type Param = {
  key: string;
  name: string;
  params: {
    id: number;
    name: string;
  };
};

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'white' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export const AssetDetail = () => {
  const routeProps = useRoute<Param>();
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  React.useEffect(() => {
    console.log(routeProps);
  }, [routeProps]);
  return (
    <PlatformView style={styleProvider.bgBody}>
      <StatusBar backgroundColor={colorScheme.theme} barStyle="light-content" />
      <NavigationHeader
        title={routeProps.params.name}
        bgColor={colorScheme.theme}
        headerStyle="light"
      />
      <ScrollTabView routes={routes} renderScene={renderScene} />
    </PlatformView>
  );
};
