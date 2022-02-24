import { i18n } from 'i18n';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker, PickerItemValue, View } from 'react-native-ui-lib';
import { localeKey } from 'services/storage';
import { colorScheme } from 'shared/styles';
import { Icon } from '../icon';
import { TextContainer } from '../text-container';
import { currencyList } from './constants';

const SCREEN_CONTENT = i18n[localeKey].currencyPicker;

interface IProps {
  errorMessage?: string;
  onChange?: (value: string) => void | void;
}

export const CurrencyPicker = ({ errorMessage, onChange }: IProps) => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = React.useCallback(
    (val: string) => {
      setSelectedValue(val);
      if (onChange) onChange(val);
    },
    [onChange]
  );
  return (
    <View>
      <Picker
        migrate
        migrateTextField
        label={SCREEN_CONTENT.currency}
        placeholder={SCREEN_CONTENT.currency}
        topBarProps={{ title: SCREEN_CONTENT.currency }}
        showSearch
        value={selectedValue}
        onChange={handleChange}
        searchPlaceholder={SCREEN_CONTENT.search}
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
      <TextContainer
        style={{ marginTop: 10 }}
        type="extra-small"
        color={colorScheme.red500}
      >
        {errorMessage}
      </TextContainer>
    </View>
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
