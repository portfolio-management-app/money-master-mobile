import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { styleProvider, colorScheme } from 'shared/styles';
import { Icon } from '../Icon';
import { SpeedDial } from '../SpeedDial';
import { TextContainer } from '../TextContainer';

interface IProps {
  onImport?: () => void;
  onExport?: () => void;
  onBuy?: () => void;
  onTransfer?: () => void;
  onDraw?: () => void;
}

export const AssetSpeedDialButton = ({
  onBuy,
  onDraw,
  onExport,
  onImport,
  onTransfer,
}: IProps) => {
  return (
    <SpeedDial
      renderItems={() => (
        <SpeedDialItems
          onBuy={onBuy}
          onDraw={onDraw}
          onExport={onExport}
          onImport={onImport}
          onTransfer={onTransfer}
        />
      )}
    />
  );
};

const SpeedDialItems = ({
  onBuy,
  onDraw,
  onExport,
  onImport,
  onTransfer,
}: IProps) => {
  return (
    <>
      <View style={styleProvider.speedDialWrapper}>
        <View style={styleProvider.speedDialTooltip}>
          <TextContainer>{ASSET_DETAIL_CONTENT.import}</TextContainer>
        </View>
        <TouchableOpacity
          onPress={onImport}
          style={styleProvider.speedDialButton}
        >
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
        <TouchableOpacity
          onPress={onExport}
          style={styleProvider.speedDialButton}
        >
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
        <TouchableOpacity
          onPress={onTransfer}
          style={styleProvider.speedDialButton}
        >
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
        <TouchableOpacity
          onPress={onDraw}
          style={styleProvider.speedDialButton}
        >
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
        <TouchableOpacity onPress={onBuy} style={styleProvider.speedDialButton}>
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
