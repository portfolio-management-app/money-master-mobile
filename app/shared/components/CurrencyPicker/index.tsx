import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker, PickerItemValue, View } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, fontProvider } from 'shared/styles';
import { Icon } from '../Icon';
import { TextContainer } from '../TextContainer';
import { currencyList } from './constants';

const SCREEN_CONTENT = APP_CONTENT.currencyPicker;

interface IProps {
  errorMessage?: string;
  onChange?: (value: string) => void | void;
  bgColor?: string;
  headerStyle?: 'light-content' | 'dark-content';
  initVal?: string;
  renderPicker: (value?: PickerItemValue, label?: string) => JSX.Element;
}

const Component = ({
  errorMessage,
  onChange,
  bgColor = colorScheme.white,
  headerStyle = 'dark-content',
  renderPicker,
  initVal,
}: IProps) => {
  const [selectedValue, setSelectedValue] = React.useState(
    initVal ? initVal : ''
  );
  console.log('render');

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
        renderPicker={renderPicker}
      >
        {Object.keys(currencyList).map((key: string) => (
          <Picker.Item key={key} value={key} label={key} />
        ))}
      </Picker>
      {errorMessage ? (
        <TextContainer type="extra-small" color={colorScheme.red500}>
          {errorMessage}
        </TextContainer>
      ) : (
        <></>
      )}
    </View>
  );
};

export const CurrencyPicker = React.memo(Component);

export const renderPickerForPortfolio = (
  value?: PickerItemValue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label?: string
) => {
  return (
    <View style={styles.picker}>
      <TextContainer>
        {value ? (
          `${value}:  ${currencyList[value as string]}`
        ) : (
          <TextContainer color={colorScheme.gray400}>
            {APP_CONTENT.selectCurrency}
          </TextContainer>
        )}
      </TextContainer>
      <Icon.SimpleLine size={15} name="arrow-down" />
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
    marginBottom: 10,
  },
});
