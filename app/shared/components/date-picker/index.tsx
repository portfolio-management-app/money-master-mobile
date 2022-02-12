import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { iconProvider, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { Icon } from 'react-native-elements';
import { TextContainer } from 'shared/components';

interface IProps {
  label: string;
  onChange?: (date: Date) => void;
}

export const DatePicker = ({ label }: IProps) => {
  const [date, setDate] = React.useState(new Date());
  const [dateString, setDateString] = React.useState(
    parseToString(new Date(), false)
  );
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const toggle = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
    setDateString(parseToString(currentDate, false));
  };
  return (
    <View>
      <TouchableOpacity onPress={toggle} style={[styleProvider.textField]}>
        <TextContainer
          style={{ marginBottom: 10, fontWeight: '800' }}
          type="small"
        >
          {label}
        </TextContainer>
        <View style={styles.datePicker}>
          <TextContainer type="small">{dateString}</TextContainer>
          <Icon
            name="calendar"
            type={iconProvider.evilicon}
            tvParallaxProperties={{}}
          />
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date(2000, 1, 1)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
