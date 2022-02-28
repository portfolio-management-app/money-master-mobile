import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';

interface IProps {
  id: number;
  name: string;
  description: string;
  value: number;
}

export const OtherCard = ({ id, name, description, value }: IProps) => {
  return <TouchableOpacity></TouchableOpacity>;
};
