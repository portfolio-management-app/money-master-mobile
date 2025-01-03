import React from 'react';
import { StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import { TextContainer } from '../TextContainer';

interface IProps {
  barStyle?: 'light' | 'dark';
  enableScroll?: boolean;
  onChangeView?: (index: number) => void;
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
  activeColor?: string;
  inactiveColor?: string;
}

export const ScrollTabView = ({
  enableScroll,
  tabWidth,
  renderScene,
  routes,
  indicatorStyle,
  style,
  onChangeView,
  activeColor,
  inactiveColor,
}: IProps) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index: number) => {
        setIndex(index);
        if (onChangeView) onChangeView(index);
      }}
      renderTabBar={(props) => (
        <TabBar
          activeColor={activeColor}
          inactiveColor={inactiveColor}
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
