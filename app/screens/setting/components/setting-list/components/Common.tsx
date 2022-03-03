import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextContainer } from 'shared/components';

interface IProps {
  icon: JSX.Element;
  title: string;
}

export const Common = ({ icon, title }: IProps) => {
  return (
    <TouchableOpacity>
      {icon}
      <TextContainer>{title}</TextContainer>
    </TouchableOpacity>
  );
};
