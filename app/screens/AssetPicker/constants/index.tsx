import React from 'react';
import { Icon } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';

export const PICKER_LABEL = APP_CONTENT.portfolioDetail.assetPicker;
export const COLOR = colorScheme.black200;
export const SIZE = 30;

export const ITEMS = [
  {
    id: -1,
    label: PICKER_LABEL.nft,
    icon: (
      <Icon.MaterialCommunity
        style={{ width: SIZE }}
        size={SIZE}
        color={COLOR}
        name="bitcoin"
      />
    ),
  },
  {
    id: -2,
    label: PICKER_LABEL.stock,
    icon: (
      <Icon.Material
        size={SIZE}
        style={{ width: SIZE }}
        color={COLOR}
        name="insert-chart"
      />
    ),
  },
  {
    id: -3,
    label: PICKER_LABEL.banking,
    icon: (
      <Icon.FontAwesome
        size={SIZE - 5}
        style={{ width: SIZE }}
        color={COLOR}
        name="bank"
      />
    ),
  },
  {
    id: -4,
    label: PICKER_LABEL.realEstate,
    icon: (
      <Icon.FontAwesome5
        style={{ width: SIZE }}
        size={SIZE - 5}
        color={COLOR}
        name="building"
      />
    ),
  },
  {
    id: -5,
    label: PICKER_LABEL.cash,
    icon: (
      <Icon.FontAwesome5
        style={{ width: SIZE }}
        size={SIZE - 10}
        color={COLOR}
        name="money-bill-wave-alt"
      />
    ),
  },
  {
    id: -6,
    label: PICKER_LABEL.metal,
    icon: (
      <Icon.MaterialCommunity
        style={{ width: SIZE }}
        size={SIZE}
        color={COLOR}
        name="gold"
      />
    ),
  },
];
