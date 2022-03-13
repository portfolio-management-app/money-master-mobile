import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CoinDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';

const DATA_RANGE = [1, 7, 30, 365];

const RANGE_CONTENT = APP_CONTENT.cryptoDetail.range;

export const DateRange = () => {
  const { getChartData, currency, coinInfo } = CoinDetailStore;

  const [dayRange, setDayRange] = React.useState(1);

  const changeRange = React.useCallback((day: number) => {
    setDayRange(day);
  }, []);

  React.useEffect(() => {
    getChartData(coinInfo.id, currency, dayRange);
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

const getRenderText = (value: 1 | 7 | 30 | 365) => {
  switch (value) {
    case 1:
      return `1 ${RANGE_CONTENT.D}`;
    case 7:
      return `1 ${RANGE_CONTENT.W}`;
    case 30:
      return `1 ${RANGE_CONTENT.M}`;
    case 365:
      return `1 ${RANGE_CONTENT.Y}`;
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
