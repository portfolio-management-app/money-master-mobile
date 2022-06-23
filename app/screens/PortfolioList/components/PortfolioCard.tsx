import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { EditDeleteActionSheet, TextContainer } from 'shared/components';
import { IPortfolio } from 'shared/models';
import { colorScheme } from 'shared/styles';
import { formatCurrency } from 'utils/number';

interface IProps {
  item: IPortfolio;
}

export const PortfolioCard = ({ item }: IProps) => {
  const [showSheet, setShowSheet] = React.useState(false);
  const navigation = useNavigation<MainStackNavigationProp>();

  const gotoDetail = () => {
    navigation.navigate('PortfolioDetail', { info: item });
  };

  const handleEditPress = () => {
    navigation.navigate('EditPortfolio', {
      portfolio: item,
      editFrom: 'PortfolioList',
    });
  };
  return (
    <>
      <TouchableOpacity
        onLongPress={() => setShowSheet(true)}
        onPress={gotoDetail}
        style={styles.container}
      >
        <TextContainer>{item.name}</TextContainer>
      </TouchableOpacity>
      <EditDeleteActionSheet
        onEditPress={handleEditPress}
        show={showSheet}
        onClose={() => setShowSheet(false)}
      />
    </>
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
