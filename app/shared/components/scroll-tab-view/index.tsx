import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import { colorScheme } from 'shared/styles';
import { TextContainer } from '../text-container';

interface IProps {
  barStyle?: 'light' | 'dark';
  enableScroll?: boolean;
  tabWidth?: number;
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
            <TextContainer style={{ color: color }} type="small">
              {route.title}
            </TextContainer>
          )}
          indicatorStyle={{ backgroundColor: colorScheme.white }}
          style={{ backgroundColor: colorScheme.theme }}
          {...props}
        />
      )}
      initialLayout={{ width: layout.width }}
    />
  );
};
