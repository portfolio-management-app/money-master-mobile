import React from 'react';
import { StyleSheet } from 'react-native';
import { PickerItemValue, View } from 'react-native-ui-lib';
import { CurrencyPicker, Icon, TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  onChange?: (val: string) => void;
}

const Component = ({ onChange }: IProps) => {
  const handleChangeCurrency = React.useCallback(
    (value: string) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );
  return (
    <View style={styles.filter}>
      <CurrencyPicker
        bgColor={colorScheme.theme}
        headerStyle="light-content"
        renderPicker={renderPicker}
        onChange={handleChangeCurrency}
      />
    </View>
  );
};

export const Filter = React.memo(Component);

const renderPicker = (value?: PickerItemValue) => {
  return (
    <View style={styles.picker}>
      <TextContainer light>{value ? value : 'USD'}</TextContainer>
      <Icon.Entypo name="chevron-down" color={colorScheme.white} size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colorScheme.gray400,
    borderBottomWidth: 0.5,
    backgroundColor: colorScheme.theme,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
