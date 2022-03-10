import React from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { TextContainerProps } from 'shared/types';
import { TextContainer } from '../TextContainer';

interface IProps extends TextContainerProps {
  url: string;
  title: string;
}

export const HyperLink = ({ url, title, ...res }: IProps) => {
  const handlePress = React.useCallback(async () => {
    await Linking.openURL(url);
  }, [url]);
  return (
    <TouchableOpacity onPress={handlePress}>
      <TextContainer {...res}>{title}</TextContainer>
    </TouchableOpacity>
  );
};
