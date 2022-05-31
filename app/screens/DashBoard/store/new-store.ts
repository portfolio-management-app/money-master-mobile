import { newsService } from 'services/news';
import { flow, types, SnapshotIn, cast } from 'mobx-state-tree';
import { HttpError } from 'errors/base';
import { log } from 'services/log';

const New = types.model({
  author: types.maybeNull(types.string),
  title: types.string,
  description: types.string,
  url: types.string,
  urlToImage: types.string,
  publishedAt: types.string,
  content: types.string,
});

export type INew = SnapshotIn<typeof New>;
export const NewStore = types
  .model('NewStore', {
    newList: types.array(New),
    loading: types.boolean,
  })
  .actions((self) => {
    const getNews = flow(function* () {
      self.loading = true;
      const res = yield newsService.getNews();
      if (res instanceof HttpError) {
        log('Error when get news', res);
      } else {
        self.newList = cast([...self.newList, ...res]);
      }
      self.loading = false;
    });
    const reset = () => {
      newsService.reset();
      self.newList = cast([]);
      getNews();
    };
    return { getNews, reset };
  })
  .create({ loading: false });
