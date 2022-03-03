import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';

interface IProps {
  id: number;
  name: string;
  description: string;
  value: number;
}

export const OtherCard = ({ id, name, description, value }: IProps) => {
  console.log(id, name, description, value);
  return <TouchableOpacity></TouchableOpacity>;
};
