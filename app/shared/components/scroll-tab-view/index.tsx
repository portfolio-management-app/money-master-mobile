import React from 'react';
import { StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import { TextContainer } from '../text-container';

interface IProps {
  barStyle?: 'light' | 'dark';
  enableScroll?: boolean;
  tabWidth?: number;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  routes: Array<{
    key: string;
    title: string;
  }>;
  renderScene: ({
    route,
    jumpTo,
    position,
  }: SceneRendererProps & { route: any }) => JSX.Element;
}

export const ScrollTabView = ({
  enableScroll,
  tabWidth,
  renderScene,
  routes,
  indicatorStyle,
  style,
}: IProps) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          tabStyle={{ width: tabWidth }}
          scrollEnabled={enableScroll}
          renderLabel={({ route, color }) => (
            <TextContainer color={color} type="small">
              {route.title}
            </TextContainer>
          )}
          indicatorStyle={indicatorStyle}
          style={style}
          {...props}
        />
      )}
      initialLayout={{ width: layout.width }}
    />
  );
};
