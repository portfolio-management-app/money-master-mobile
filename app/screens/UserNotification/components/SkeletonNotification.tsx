import React from 'react';
import { View } from 'react-native';
import { SkeletonView } from 'react-native-ui-lib';
import { styleProvider } from 'shared/styles';

export const SkeletonNotification = () => {
  const render = React.useMemo(() => {
    const components: Array<React.ReactElement> = [];
    for (let i = 0; i < 9; i++) {
      components.push(
        <View
          style={[styleProvider.centerHorizontal, { paddingHorizontal: 20 }]}
          key={i}
        >
          <SkeletonView
            width={50}
            height={50}
            borderRadius={50}
            circle
          ></SkeletonView>
          <SkeletonView
            times={10}
            showContent={true}
            template={SkeletonView.templates.LIST_ITEM}
          />
        </View>
      );
    }
    return components;
  }, []);

  return (
    <>
      {render.map((item) => {
        return item;
      })}
    </>
  );
};
