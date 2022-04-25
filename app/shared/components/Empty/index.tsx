import React from 'react';
import { StyleSheet, View } from 'react-native';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { Icon } from '../Icon';
import { TextContainer } from '../TextContainer';

interface IProps {
  message?: string;
}

export const Empty = ({ message = APP_CONTENT.emptyData }: IProps) => {
  return (
    <View style={styles.container}>
      <Icon.Ioni
        size={50}
        color={colorScheme.black200}
        name="file-tray-full-outline"
      />
      <TextContainer>{message}</TextContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
