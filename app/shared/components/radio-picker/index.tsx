import { TextContainer } from 'shared/components';
import React from 'react';
import { RadioButton, RadioGroup } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';
import { RadioPickerProps } from 'shared/types';

export const RadioPicker = ({
  values,
  title,
  onChange,
  titleStyle,
  labelStyle,
  containerStyle,
  buttonStyle,
  initValue = values[0],
  size = 25,
}: RadioPickerProps) => {
  return (
    <RadioGroup
      style={containerStyle}
      onValueChange={(value: string) => {
        if (onChange) onChange(value);
      }}
      initialValue={initValue}
    >
      <TextContainer {...titleStyle} bold>
        {title}
      </TextContainer>
      {values.map((value) => (
        <RadioButton
          containerStyle={buttonStyle}
          key={value}
          size={size}
          labelStyle={labelStyle}
          color={colorScheme.theme}
          label={value}
          value={value}
        ></RadioButton>
      ))}
    </RadioGroup>
  );
};
