import { observer } from 'mobx-react-lite';
import React from 'react';
import { CustomToast } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore } from 'shared/stores';
import { CreateBankAssetBody } from 'shared/stores/types';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

export const Bank = observer(({ onClose }: ModalProps) => {
  const { createBankAsset, createResponse } = PortfolioDetailStore;
  const onCreate = React.useCallback(
    (data: CreateBankAssetBody) => {
      createBankAsset(data);
    },
    [createBankAsset]
  );
  return (
    <>
      <CreateForm onSubmit={onCreate} onClose={onClose} />
      <CustomToast
        variant="error"
        show={createResponse.isError}
        onDismiss={createResponse.deleteError}
        message={createResponse.errorMessage}
      />
      <CustomToast
        onDismiss={createResponse.deleteSuccess}
        show={createResponse.isSuccess}
        message={APP_CONTENT.transferToFund.success}
      />
    </>
  );
});
