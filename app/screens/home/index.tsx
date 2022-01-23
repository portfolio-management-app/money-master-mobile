import { useNavigation } from '@react-navigation/native';
import { Observer } from 'mobx-react-lite';
import { SCREEN_NAME } from 'navigation/screenNames';
import React from 'react';
import { Button, SafeAreaView, ScrollView, Text } from 'react-native';
import { userStore } from 'stores';

export const Home = () => {
  const navigation = useNavigation();

  const { user, increaseAge } = userStore;

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button
          onPress={() => navigation.navigate(SCREEN_NAME.login as never)}
          title="Hello world"
        />
        <Button title="Increase" onPress={() => increaseAge()} />
        <Text>{user.name}</Text>
        <Observer>
          {() => {
            return <Text>{user.age}</Text>;
          }}
        </Observer>
      </ScrollView>
    </SafeAreaView>
  );
};
