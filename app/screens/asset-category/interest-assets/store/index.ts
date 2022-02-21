import { HttpError } from 'errors/base';
import { types, flow, cast } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { UserStore } from 'shared/stores';

type CategoryResponse = {
  id: number;
  name: string;
};

const AssetCategory = types.model('AssetCategory', {
  id: types.number,
  name: types.string,
});

export const CategoryStore = types
  .model('CategoryStore', {
    categoryList: types.array(AssetCategory),
    loading: false,
  })
  .actions((self) => {
    const createCategory = flow(function* (name: string) {
      self.loading = true;
      const res: CategoryResponse | HttpError = yield httpRequest.sendPost(
        '/personalAsset/interest/custom',
        { name: name },
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        console.log('__ERROR__', res);
      } else {
        self.categoryList = cast([...self.categoryList, res]);
      }
      self.loading = false;
    });

    const getCategoryList = flow(function* () {
      self.loading = true;
      const res: Array<CategoryResponse> | HttpError =
        yield httpRequest.sendGet(
          '/personalAsset/interest/custom',
          UserStore.user.token
        );

      if (res instanceof HttpError) {
        console.log('__ERROR__', res);
      } else {
        self.categoryList = cast(res);
      }
      self.loading = false;
    });

    return { getCategoryList, createCategory };
  })
  .create({
    categoryList: [],
  });
