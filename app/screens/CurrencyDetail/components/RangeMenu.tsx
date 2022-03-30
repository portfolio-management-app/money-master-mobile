import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { View } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CurrencyDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';

const RANGE_CONTENT = APP_CONTENT.stockDetail.range;

export const RangeMenu = () => {
  const [range, setRange] = React.useState<string>(RANGE_CONTENT.D);
  const { getChartData, currencyInformation } = CurrencyDetailStore;
  return (
    <Menu>
      <MenuTrigger>
        <View style={styleProvider.centerHorizontal}>
          <TextContainer mr={10} type="small">
            {range}
          </TextContainer>
          <Icon.FontAwesome
            name="calendar"
            size={25}
            color={colorScheme.black200}
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 10,
            padding: 10,
          },
        }}
      >
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.H);
            getChartData('1h', currencyInformation.s);
          }}
        >
          <TextContainer>{RANGE_CONTENT.H}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.D);
            getChartData('1d', currencyInformation.s);
          }}
        >
          <TextContainer>{RANGE_CONTENT.D}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.W);
            getChartData('1w', currencyInformation.s);
          }}
        >
          <TextContainer>{RANGE_CONTENT.W}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.M);
            getChartData('1m', currencyInformation.s);
          }}
        >
          <TextContainer>{RANGE_CONTENT.M}</TextContainer>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};
