import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { PlatformView, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { styleProvider } from 'shared/styles';
import { Header, NewItem } from './components';
import { NewStore } from './store/new-store';

export const DashBoard = observer(() => {
  React.useEffect(() => {
    NewStore.getNews();
  }, []);
  return (
    <PlatformView style={styleProvider.body}>
      <Header />
      <TextContainer ml={20} mb={10} mt={10} bold>
        {APP_CONTENT.dashboard.new}
      </TextContainer>
      <FlatList
        onEndReached={() => NewStore.getNews()}
        refreshControl={
          <RefreshControl
            refreshing={NewStore.loading}
            onRefresh={() => NewStore.reset()}
          />
        }
        keyExtractor={(data) => data.url}
        data={NewStore.newList}
        renderItem={(data) => {
          return <NewItem item={data.item} />;
        }}
      />
    </PlatformView>
  );
});
