import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, TouchableOpacity } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { UserNotificationStore } from 'shared/stores';
import { colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';

export const Header = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { getNotReadNotification } = UserNotificationStore;

  const count = getNotReadNotification();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <View>
        <TextContainer type="h2" bold>
          {APP_CONTENT.dashboard.today}
        </TextContainer>
        <TextContainer>
          {parseToString(new Date(), { withTime: false })}
        </TextContainer>
      </View>
      <TouchableOpacity
        style={styles.badgeWrapper}
        onPress={() => navigation.navigate('UserNotification')}
      >
        <Icon.Material
          name="notifications"
          size={40}
          color={colorScheme.theme}
        />
        {count > 0 && (
          <Badge
            style={styles.badge}
            backgroundColor={colorScheme.red500}
            size={20}
            label={`${count < 10 ? count : '9+'}`}
          />
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  badgeWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
  },
});
