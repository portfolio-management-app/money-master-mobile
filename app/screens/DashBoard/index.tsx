import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { PlatformView, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { UserNotificationStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { Header, NewItem } from './components';
import { NewStore } from './store/new-store';

export const DashBoard = observer(() => {
  const { getNotificationList } = UserNotificationStore;
  const { getNews, loading, newList, reset } = NewStore;
  React.useEffect(() => {
    getNews();
    getNotificationList();
  }, [getNews, getNotificationList]);
  return (
    <PlatformView style={styleProvider.body}>
      <Header />
      <TextContainer ml={20} mb={10} mt={10} bold>
        {APP_CONTENT.dashboard.new}
      </TextContainer>
      <FlatList
        onEndReached={() => getNews()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => reset()} />
        }
        keyExtractor={(data) => data.url}
        data={newList}
        renderItem={(data) => {
          return <NewItem item={data.item} />;
        }}
      />
    </PlatformView>
  );
});
