import { observer } from 'mobx-react-lite';
import React from 'react';
import { CustomToast } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore } from 'shared/stores';
import { CreateOtherAssetBody } from 'shared/stores/types';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

interface IProps extends ModalProps {
  id: number;
}

export const Other = observer(({ onClose, header, id }: IProps) => {
  const { createOtherAsset, createResponse } = PortfolioDetailStore;
  const onCreate = React.useCallback(
    (data: CreateOtherAssetBody) => {
      createOtherAsset(data, id);
    },
    [id, createOtherAsset]
  );
  return (
    <>
      <CreateForm header={header} onSubmit={onCreate} onClose={onClose} />
      <CustomToast
        variant="error"
        show={createResponse.isError}
        onDismiss={createResponse.deleteError}
        message={createResponse.errorMessage}
      />
      <CustomToast
        onDismiss={createResponse.deleteSuccess}
        show={createResponse.isSuccess}
        message={APP_CONTENT.buyScreen.createSuccess}
      />
    </>
  );
});
