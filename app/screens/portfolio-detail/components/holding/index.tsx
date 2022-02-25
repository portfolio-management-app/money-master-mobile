import React from 'react';
import { FloatingButton, Icon, PlatformView } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetTypePicker } from './components';

export const Holding = () => {
  const [showPicker, setShowPicker] = React.useState(false);

  const toggle = () => {
    setShowPicker(!showPicker);
  };
  return (
    <PlatformView style={styleProvider.body}>
      <AssetTypePicker show={showPicker} onClose={toggle} />

      <FloatingButton onPress={toggle} placement="bottom-right">
        <Icon.Material color={colorScheme.white} size={25} name="add" />
      </FloatingButton>
    </PlatformView>
  );
};
