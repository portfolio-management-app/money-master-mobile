import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { IPortfolio } from 'shared/models';
import { colorScheme } from 'shared/styles';
import { formatCurrency } from 'utils/number';

interface IProps {
  item: IPortfolio;
}

export const PortfolioCard = ({ item }: IProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  const gotoDetail = () => {
    navigation.navigate('PortfolioDetail', { info: item });
  };
  return (
    <TouchableOpacity onPress={gotoDetail} style={styles.container}>
      <TextContainer>{item.name}</TextContainer>
      <TextContainer color={colorScheme.theme} style={styles.textContainer}>
        {formatCurrency(item.sum, item.initialCurrency)}
      </TextContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.blue100,
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
  },
  textContainer: {
    marginTop: 10,
  },
});
