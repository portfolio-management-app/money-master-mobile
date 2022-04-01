import { getUnixTime, addDays } from 'date-fns';
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
import { StockDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';

const RANGE_CONTENT = APP_CONTENT.stockDetail.range;

const Component = () => {
  const [range, setRange] = React.useState<string>(RANGE_CONTENT.D);
  const { getChartData, symbol } = StockDetailStore;
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
            setRange(RANGE_CONTENT.D);
            getChartData(
              symbol,
              getUnixTime(addDays(new Date(), -1)),
              getUnixTime(new Date()),
              '15'
            );
          }}
        >
          <TextContainer>{RANGE_CONTENT.D}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.W);
            getChartData(
              symbol,
              getUnixTime(addDays(new Date(), -7)),
              getUnixTime(new Date()),
              '30'
            );
          }}
        >
          <TextContainer>{RANGE_CONTENT.W}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.M);
            getChartData(
              symbol,
              getUnixTime(addDays(new Date(), -30)),
              getUnixTime(new Date()),
              '60'
            );
          }}
        >
          <TextContainer>{RANGE_CONTENT.M}</TextContainer>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export const RangeMenu = React.memo(Component);
