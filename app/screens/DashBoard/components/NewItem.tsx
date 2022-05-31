import React from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { INew } from '../store/new-store';

interface IProps {
  item: INew;
}
export const NewItem = ({ item }: IProps) => {
  const handleOpenNew = (url: string) => {
    Linking.openURL(url)
      .then((res) => console.log('Open new success', res))
      .catch(() =>
        Alert.alert(
          APP_CONTENT.dashboard.openNew.error,
          APP_CONTENT.dashboard.openNew.errorMessage
        )
      );
  };
  return (
    <TouchableOpacity
      onPress={() => handleOpenNew(item.url)}
      style={styles.newItem}
      key={item.url}
    >
      <Image
        source={{ uri: item.urlToImage }}
        style={{ height: 100, width: 100, marginRight: 5 }}
      />

      <TextContainer type="small" style={{ flex: 1 }}>
        {item.title}
      </TextContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: colorScheme.gray600,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
});
