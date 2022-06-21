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
import { ProfitPeriod } from 'shared/stores/types';

import { colorScheme, styleProvider } from 'shared/styles';

const RANGE_CONTENT = APP_CONTENT.profit;
interface IProps {
  onSelect: (time: ProfitPeriod) => void;
}

const Component = ({ onSelect }: IProps) => {
  const [range, setRange] = React.useState<string>(RANGE_CONTENT.day);
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
            setRange(RANGE_CONTENT.day);
            onSelect('day');
          }}
        >
          <TextContainer>{RANGE_CONTENT.day}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.week);
            onSelect('week');
          }}
        >
          <TextContainer>{RANGE_CONTENT.week}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.month);
            onSelect('month');
          }}
        >
          <TextContainer>{RANGE_CONTENT.month}</TextContainer>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export const ProfitRangeMenu = React.memo(Component);
