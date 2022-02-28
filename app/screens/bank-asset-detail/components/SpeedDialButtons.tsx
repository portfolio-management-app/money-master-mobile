import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextContainer, Icon } from 'shared/components';
import { styleProvider, colorScheme } from 'shared/styles';

export const SpeedDialButtons = () => {
  return (
    <>
      <View style={styleProvider.speedDialWrapper}>
        <View style={styleProvider.speedDialTooltip}>
          <TextContainer>Transfer</TextContainer>
        </View>
        <TouchableOpacity style={styleProvider.speedDialButton}>
          <Icon.MaterialCommunity
            size={20}
            color={colorScheme.white}
            name="minus-box"
          />
        </TouchableOpacity>
      </View>
      <View style={styleProvider.speedDialWrapper}>
        <View style={styleProvider.speedDialTooltip}>
          <TextContainer>Receive</TextContainer>
        </View>
        <TouchableOpacity style={styleProvider.speedDialButton}>
          <Icon.Material
            size={20}
            color={colorScheme.white}
            name="library-add"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
