import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  name: string;
  balance: number;
  increase: number;
}

export const PortfolioCard = ({ name, balance, increase }: IProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <TextContainer>{name}</TextContainer>
      <TextContainer color={colorScheme.theme} style={styles.textContainer}>
        ${balance}{' '}
        <TextContainer color={colorScheme.green200}>+${increase}</TextContainer>
      </TextContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.gray100,
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
  },
  textContainer: {
    marginTop: 10,
  },
});
