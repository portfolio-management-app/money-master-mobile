import React from 'react';
import { Button } from 'react-native-elements';
import { Observer } from 'mobx-react-lite';
import { Loading, PlatformView, TextContainer } from 'components';
import { UserStore } from 'stores/data-store';
import { useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import { LocaleStore } from 'stores/ui-store';

export const Home = () => {
  const { user, increaseAge } = UserStore;
  const { changeLocale, currentLocale } = LocaleStore;

  const navigation = useNavigation();

  return (
    <>
      <PlatformView>
        <TextContainer style={{ fontSize: 100 }}>{user.name}</TextContainer>

        <Observer>
          {() => {
            return (
              <TextContainer style={{ fontSize: 100 }}>
                {user.age}
              </TextContainer>
            );
          }}
        </Observer>

        <Button title="Increase" type="solid" onPress={() => increaseAge()} />

        <Button
          title="Logout"
          type="solid"
          containerStyle={{ marginTop: 30 }}
          onPress={() => navigation.navigate(screenName.start as never)}
        />
        <Button
          onPress={() => {
            if (currentLocale == 'en') {
              changeLocale('vn');
            } else changeLocale('en');
          }}
          containerStyle={{ marginTop: 30 }}
          title="Toggle lang"
        ></Button>
      </PlatformView>
      <Loading show={false} />
    </>
  );
};
