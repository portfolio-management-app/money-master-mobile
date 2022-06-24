import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { colorScheme, fontProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { Icon, TextContainer } from 'shared/components';

interface IProps {
  label: string;
  onChange?: (date: Date) => void;
  onISOStringChange?: (value: string) => void | void;
  maxDate?: Date;
  minDate?: Date;
  initDate?: Date;
}

export const DatePicker = ({
  label,
  onChange,
  minDate,
  maxDate,
  onISOStringChange,
  initDate,
}: IProps) => {
  const [date, setDate] = React.useState(new Date());
  const [dateString, setDateString] = React.useState(
    parseToString(new Date(), { withTime: false })
  );
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const mounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (initDate && !mounted.current) {
      setDate(initDate);
      setDateString(parseToString(initDate));
      mounted.current = true;
    }
  }, [initDate]);

  const toggle = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onDateChange = React.useCallback(
    (event: Event, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || date;
      if (onChange) {
        onChange(currentDate);
      }
      if (onISOStringChange) {
        const [withoutTime] = currentDate.toISOString().split('T');
        onISOStringChange(withoutTime);
      }
      setDate(currentDate);
      setDateString(parseToString(currentDate, { withTime: false }));
    },
    [onChange, date, onISOStringChange]
  );
  return (
    <View>
      <TouchableOpacity onPress={toggle} style={styles.datePickerButton}>
        <TextContainer style={{ marginBottom: 10 }}>{label}</TextContainer>
        <View style={styles.datePicker}>
          <TextContainer>{dateString}</TextContainer>
          <Icon.FontAwesome size={20} name="calendar" />
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour
          display="default"
          onChange={(event: Event, date: Date | undefined) => {
            toggle();
            onDateChange(event, date);
          }}
          onTouchCancel={toggle}
          maximumDate={maxDate ? maxDate : new Date()}
          minimumDate={minDate ? minDate : new Date(2000, 1, 1)}
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
  datePickerButton: {
    borderBottomWidth: 0.5,
    borderColor: colorScheme.black200,
    paddingBottom: 4,
    marginBottom: 20,
    fontFamily: fontProvider.openSans,
  },
});
