import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { StockDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { StockTimeSupport } from 'shared/types';
import { getUnixTimeStamp } from 'utils/date';

const DATA_RANGE: Array<StockTimeSupport> = ['1h', '1day', '1week', '1month'];

const RANGE_CONTENT = APP_CONTENT.stockDetail.range;

export const DateRange = () => {
  const { stockInformation, getStockData } = StockDetailStore;

  const [dayRange, setDayRange] = React.useState<StockTimeSupport>('1h');

  const changeRange = React.useCallback((day: StockTimeSupport) => {
    setDayRange(day);
  }, []);

  const mount = React.useRef<number>(0);

  React.useEffect(() => {
    if (mount) getStockData(stockInformation.symbol, dayRange);
    mount.current++;
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
    case '1h':
      return `1 ${RANGE_CONTENT.H}`;
    case '1day':
      return `1 ${RANGE_CONTENT.D}`;
    case '1week':
      return `1 ${RANGE_CONTENT.W}`;
    case '1month':
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
    width: 50,
  },
  rangeBtnCurrent: {
    backgroundColor: colorScheme.gray100,
  },
});
