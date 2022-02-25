import { i18n } from 'i18n';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker, PickerItemValue, View } from 'react-native-ui-lib';
import { localeKey } from 'services/storage';
import { colorScheme, fontProvider } from 'shared/styles';
import { Icon } from '../icon';
import { TextContainer } from '../text-container';
import { currencyList } from './constants';

const SCREEN_CONTENT = i18n[localeKey].currencyPicker;

interface IProps {
  errorMessage?: string;
  onChange?: (value: string) => void | void;
  bgColor?: string;
  headerStyle?: 'light-content' | 'dark-content';
}

const Component = ({
  errorMessage,
  onChange,
  bgColor = colorScheme.white,
  headerStyle = 'dark-content',
}: IProps) => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const color = React.useMemo(() => {
    if (headerStyle == 'light-content') return colorScheme.white;
    return colorScheme.black200;
  }, [headerStyle]);

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
        topBarProps={{
          title: SCREEN_CONTENT.currency,
          containerStyle: { backgroundColor: bgColor, paddingHorizontal: 10 },
          titleStyle: {
            color: color,
            fontFamily: fontProvider.openSans,
          },
          cancelButtonProps: { iconStyle: { tintColor: color } },
        }}
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

export const CurrencyPicker = React.memo(Component);

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
