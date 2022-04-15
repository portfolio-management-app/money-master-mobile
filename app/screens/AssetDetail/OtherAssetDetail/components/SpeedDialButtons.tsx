import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextContainer, Icon } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { styleProvider, colorScheme } from 'shared/styles';

export const SpeedDialButtons = () => {
  return (
    <>
      <View style={styleProvider.speedDialWrapper}>
        <View style={styleProvider.speedDialTooltip}>
          <TextContainer>{ASSET_DETAIL_CONTENT.import}</TextContainer>
        </View>
        <TouchableOpacity style={styleProvider.speedDialButton}>
          <Icon.MaterialCommunity
            size={20}
            color={colorScheme.white}
            name="file-import"
          />
        </TouchableOpacity>
      </View>
      <View style={styleProvider.speedDialWrapper}>
        <View style={styleProvider.speedDialTooltip}>
          <TextContainer>{ASSET_DETAIL_CONTENT.export}</TextContainer>
        </View>
        <TouchableOpacity style={styleProvider.speedDialButton}>
          <Icon.MaterialCommunity
            size={20}
            color={colorScheme.white}
            name="file-export"
          />
        </TouchableOpacity>
      </View>
      <View style={styleProvider.speedDialWrapper}>
        <View style={styleProvider.speedDialTooltip}>
          <TextContainer>{ASSET_DETAIL_CONTENT.transfer}</TextContainer>
        </View>
        <TouchableOpacity style={styleProvider.speedDialButton}>
          <Icon.MaterialCommunity
            size={25}
            color={colorScheme.white}
            name="transfer"
          />
        </TouchableOpacity>
      </View>
      <View style={styleProvider.speedDialWrapper}>
        <View style={styleProvider.speedDialTooltip}>
          <TextContainer>{ASSET_DETAIL_CONTENT.draw}</TextContainer>
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
          <TextContainer>{ASSET_DETAIL_CONTENT.buy}</TextContainer>
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
