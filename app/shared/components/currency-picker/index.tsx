import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker, PickerItemValue, View } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';
import { Icon } from '../icon';
import { TextContainer } from '../text-container';
import { currencyList } from './constants';

export const CurrencyPicker = () => {
  const [selectedValue, setSelectedValue] = React.useState('');
  return (
    <Picker
      migrate
      migrateTextField
      label="Currency"
      placeholder="Currency"
      topBarProps={{ title: 'Currency' }}
      showSearch
      value={selectedValue}
      onChange={(val: string) => setSelectedValue(val)}
      searchPlaceholder={'Search currency'}
      renderPicker={(value?: PickerItemValue, label?: string) => {
        return (
          <View style={styles.picker}>
            <TextContainer>
              {value ? (
                label
              ) : (
                <TextContainer color={colorScheme.gray400}>
                  Selected currency
                </TextContainer>
              )}
            </TextContainer>
            <Icon.SimpleLine size={15} name="arrow-down" />
          </View>
        );
      }}
    >
      {Object.keys(currencyList).map((key: string) => (
        <Picker.Item
          key={key}
          value={key}
          label={`${key}:    ${currencyList[key]}`}
        />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderBottomWidth: 0.5,
    borderBottomColor: colorScheme.black200,
    marginTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
