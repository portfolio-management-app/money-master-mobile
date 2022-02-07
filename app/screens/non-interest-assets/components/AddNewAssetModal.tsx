import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import { Button, View } from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorScheme } from 'styles';

interface IProps {
  show: boolean;
  onHide: () => void;
}

export const AddNewAssetModal = ({ show, onHide }: IProps) => {
  const [date, setDate] = React.useState(new Date(1598051730000));

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
  };

  return (
    <BottomSheet
      containerStyle={{ backgroundColor: colorScheme.loading }}
      isVisible={show}
    >
      <View style={styles.modal}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
        <Button style={styles.button} onPress={onHide} label="Cancel" />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: colorScheme.theme,
  },
  modal: {
    backgroundColor: colorScheme.white,
    height: 500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
    padding: 20,
  },
});
