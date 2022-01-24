import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { screenName } from 'navigation/screen-names';
import { PlatformView, TextContainer } from 'components';
import { UserStore } from 'stores';

export const Home = () => {
  const navigation = useNavigation();

  const { user, increaseAge } = UserStore;

  return (
    <PlatformView>
      <Button
        onPress={() => navigation.navigate(screenName.home as never)}
        title="Hello world"
      />

      <Button title="Increase" onPress={() => increaseAge()} />
      <TextContainer style={{ fontSize: 100 }}>{user.name}</TextContainer>
      <Observer>
        {() => {
          return (
            <TextContainer style={{ fontSize: 100 }}>{user.age}</TextContainer>
          );
        }}
      </Observer>
    </PlatformView>
  );
};
