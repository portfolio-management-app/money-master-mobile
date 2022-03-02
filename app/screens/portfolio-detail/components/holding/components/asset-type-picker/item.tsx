import React from 'react';
import { SCREEN_CONTENT } from 'screens/portfolio-detail/constants';
import { Icon } from 'shared/components';
import { colorScheme } from 'shared/styles';

const PICKER_LABEL = SCREEN_CONTENT.assetPicker;
const COLOR = colorScheme.black200;
const SIZE = 30;

export const ITEMS = [
  {
    id: 0,
    label: PICKER_LABEL.nft,
    icon: <Icon.MaterialCommunity size={SIZE} color={COLOR} name="bitcoin" />,
  },
  {
    id: 1,
    label: PICKER_LABEL.stock,
    icon: <Icon.Material size={SIZE} color={COLOR} name="insert-chart" />,
  },
  {
    id: 2,
    label: PICKER_LABEL.banking,
    icon: <Icon.FontAwesome size={SIZE - 5} color={COLOR} name="bank" />,
  },
  {
    id: 3,
    label: PICKER_LABEL.realEaster,
    icon: <Icon.FontAwesome5 size={SIZE - 5} color={COLOR} name="building" />,
  },
  {
    id: 4,
    label: PICKER_LABEL.cash,
    icon: (
      <Icon.FontAwesome5
        size={SIZE - 10}
        color={COLOR}
        name="money-bill-wave-alt"
      />
    ),
  },
  {
    id: 5,
    label: PICKER_LABEL.other,
    icon: <Icon.Material size={SIZE} color={COLOR} name="psychology" />,
  },
];
