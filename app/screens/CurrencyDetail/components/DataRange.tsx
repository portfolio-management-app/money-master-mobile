import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CurrencyDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { CurrencyTimeSupport } from 'shared/types';

const DATA_RANGE: Array<CurrencyTimeSupport> = ['1h', '1d', '1w', '1m'];

const RANGE_CONTENT = APP_CONTENT.stockDetail.range;

export const DateRange = () => {
  const { getChartData } = CurrencyDetailStore;
  const [dayRange, setDayRange] = React.useState<CurrencyTimeSupport>('1h');

  const changeRange = React.useCallback((day: CurrencyTimeSupport) => {
    setDayRange(day);
  }, []);

  const mount = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (mount.current) getChartData(dayRange);
    mount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayRange]);
  return (
    <View
      style={[styleProvider.centerHorizontal, { justifyContent: 'center' }]}
    >
      {DATA_RANGE.map((day) => (
        <TouchableOpacity
          onPress={() => changeRange(day)}
          style={[styles.rangeBtn, day === dayRange && styles.rangeBtnCurrent]}
          key={day}
        >
          <TextContainer textAl="center">
            {getRenderText(day as any)}
          </TextContainer>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getRenderText = (value: CurrencyTimeSupport) => {
  switch (value) {
    case '1h':
      return `1 ${RANGE_CONTENT.H}`;
    case '1d':
      return `1 ${RANGE_CONTENT.D}`;
    case '1w':
      return `1 ${RANGE_CONTENT.W}`;
    case '1m':
      return `1 ${RANGE_CONTENT.M}`;
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  rangeBtn: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangeBtnCurrent: {
    backgroundColor: colorScheme.gray100,
  },
});
