import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { UserStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';

export const AccountInfo = observer(() => {
  const { user } = UserStore;
  return (
    <View style={[styleProvider.container, styles.container]}>
      <TextContainer>
        <TextContainer bold>Email: </TextContainer>
        {user.email}
      </TextContainer>
      <TextContainer>
        <TextContainer bold>Join date: </TextContainer>
        {parseToString(new Date(), false)}
      </TextContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
