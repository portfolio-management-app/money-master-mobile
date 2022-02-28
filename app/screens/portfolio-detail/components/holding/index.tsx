import React from 'react';
import { FloatingButton, Icon, PlatformView } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetGroup, AssetTypePicker } from './components';

const Component = () => {
  const [showPicker, setShowPicker] = React.useState(false);

  const toggle = () => {
    setShowPicker(!showPicker);
  };
  return (
    <>
      <PlatformView style={[styleProvider.body]}>
        <AssetTypePicker show={showPicker} onClose={toggle} />
        <AssetGroup />
      </PlatformView>
      <FloatingButton onPress={toggle} placement="bottom-right">
        <Icon.Material color={colorScheme.white} size={25} name="add" />
      </FloatingButton>
    </>
  );
};

export const Holding = React.memo(Component);
