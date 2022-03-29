import { addDays, getUnixTime } from 'date-fns';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { StockDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { StockTimeSupport } from 'shared/types';

const DATA_RANGE: Array<StockTimeSupport> = ['D', 'W', 'M'];

const RANGE_CONTENT = APP_CONTENT.stockDetail.range;

export const DateRange = () => {
  const { getChartData, symbol } = StockDetailStore;

  const [dayRange, setDayRange] = React.useState<StockTimeSupport>('D');

  const changeRange = React.useCallback((day: StockTimeSupport) => {
    setDayRange(day);
    console.log('change');
  }, []);

  const mount = React.useRef<boolean>(false);

  React.useEffect(() => {
    console.log('mounted', mount.current);
    if (mount.current) {
      switch (dayRange) {
        case 'D':
          getChartData(
            symbol,
            getUnixTime(addDays(new Date(), -1)),
            getUnixTime(new Date()),
            '15'
          );
          break;
        case 'W':
          getChartData(
            symbol,
            getUnixTime(addDays(new Date(), -7)),
            getUnixTime(new Date()),
            '30'
          );
          break;
        case 'M':
          getChartData(
            symbol,
            getUnixTime(addDays(new Date(), -30)),
            getUnixTime(new Date()),
            '60'
          );
      }
    }
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

const getRenderText = (value: StockTimeSupport) => {
  switch (value) {
    case 'D':
      return `1 ${RANGE_CONTENT.D}`;
    case 'W':
      return `1 ${RANGE_CONTENT.W}`;
    case 'M':
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
