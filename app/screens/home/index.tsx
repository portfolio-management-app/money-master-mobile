import React from 'react';
import { Button } from 'react-native-elements';
import { Observer } from 'mobx-react-lite';
import { Loading, PlatformView, TextContainer } from 'components';
import { UserStore } from 'stores/data-store';

export const Home = () => {
  const { user, increaseAge } = UserStore;

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
      </PlatformView>
      <Loading show={false} />
    </>
  );
};
