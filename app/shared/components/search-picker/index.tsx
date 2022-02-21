import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Dialog, RadioButton, RadioGroup } from 'react-native-ui-lib';
import { colorScheme, iconProvider } from 'shared/styles';
import { TextContainer } from '../text-container';

interface IProps {
  values: Array<string>;
  onChange: (value: string) => void;
  title: string;
}

export const SearchPicker = ({ values, onChange, title }: IProps) => {
  const [show, setShow] = React.useState(false);
  const [val, setVal] = React.useState(values[0]);

  return (
    <View style={styles.pickerContainer}>
      <TextContainer style={{ marginBottom: 10 }} type="small">
        {title}
      </TextContainer>
      <TouchableOpacity onPress={() => setShow(!show)} style={styles.picker}>
        <TextContainer type="small">{val}</TextContainer>
        <Icon
          name="arrow-drop-down"
          type={iconProvider.material}
          tvParallaxProperties={{}}
        />
      </TouchableOpacity>
      <Dialog useSafeArea bottom containerStyle={styles.dialog} visible={show}>
        <RadioGroup
          onValueChange={(val: string) => {
            setShow(!show);
            setVal(val);
            onChange(val);
          }}
          initialValue={val}
        >
          {values.map((val) => (
            <RadioButton
              color={colorScheme.theme}
              containerStyle={styles.radioBtn}
              key={val}
              value={val}
              label={val}
            />
          ))}
        </RadioGroup>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    paddingHorizontal: 9,
    marginBottom: 20,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: colorScheme.gray600,
  },
  dialog: {
    backgroundColor: colorScheme.white,
    borderRadius: 10,
    padding: 20,
  },
  radioBtn: {
    marginBottom: 10,
  },
});
