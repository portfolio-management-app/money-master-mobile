import { useRoute } from '@react-navigation/native';
import { observer, Observer } from 'mobx-react-lite';
import React from 'react';
import { StatusBar } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { PlatformView, TextContainer } from 'shared/components';
import { ScrollStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { ScreenParams } from 'shared/types';
import { Header, Statistic, TabBarView } from './components';

type Param = ScreenParams & {
  params: {
    id: number;
    name: string;
  };
};

export const PortfolioDetail = observer(() => {
  const routeProps = useRoute<Param>();

  const translate = useDerivedValue(() => {
    return withTiming(ScrollStore.offSet > 50 ? 100 : ScrollStore.offSet, {
      duration: 100,
      easing: Easing.linear,
    });
  }, [ScrollStore.offSet]);

  const animatedStyles = useAnimatedStyle(() => {
    return { transform: [{ translateY: 0 }] };
  });

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.theme} barStyle="light-content" />
      <Header title={routeProps.params.name} />
      <Statistic />
      <Animated.View style={[styleProvider.body, animatedStyles]}>
        <TabBarView />
      </Animated.View>
    </PlatformView>
  );
});
