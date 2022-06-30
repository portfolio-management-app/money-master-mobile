import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IUserNotification } from 'shared/models';
import { colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.userNotification;

interface IProps {
  item: IUserNotification;
  onPress?: (item: IUserNotification) => void;
}

export const NotificationItem = ({ item, onPress }: IProps) => {
  switch (item.notificationType) {
    case 'assetReachValueHigh':
    case 'assetReachValueLow':
      return <PriceNotification onPress={onPress} item={item} />;
    default:
      return <></>;
  }
};

const PriceNotification = ({ item, onPress }: IProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(item)}
      style={[styles.item, !item.isRead && styles.readItem]}
    >
      <NotificationIcon item={item} />
      <View style={{ marginLeft: 20, flex: 1 }}>
        <TextContainer style={{ flex: 1 }} bold>
          {item.assetName}{' '}
          <TextContainer style={{ flex: 1 }}>
            {CONTENT.reach} <Price item={item} />{' '}
            {APP_CONTENT.notificationContent.in} {`"${item.portfolioName}"`}
          </TextContainer>
        </TextContainer>
        <TextContainer mt={10}>
          {parseToString(new Date(item.createDate))}
        </TextContainer>
      </View>
    </TouchableOpacity>
  );
};

const Price = ({ item }: IProps) => {
  switch (item.notificationType) {
    case 'assetReachValueHigh':
      return (
        <TextContainer bold color={colorScheme.green400}>
          {formatCurrency(item.highThreadHoldAmount, item.currency)}
        </TextContainer>
      );
    case 'assetReachValueLow':
      return (
        <TextContainer bold color={colorScheme.green400}>
          {formatCurrency(item.lowThreadHoldAmount, item.currency)}
        </TextContainer>
      );
    default:
      return <></>;
  }
};

const NotificationIcon = ({ item }: IProps) => {
  switch (item.assetType) {
    case 'crypto':
      return (
        <Icon.MaterialCommunity
          size={50}
          color={colorScheme.black200}
          name="bitcoin"
        />
      );
    case 'stock':
      return (
        <Icon.MaterialCommunity
          color={colorScheme.black200}
          size={50}
          name="chart-bar"
        />
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  readItem: {
    backgroundColor: colorScheme.blue100,
  },
});
