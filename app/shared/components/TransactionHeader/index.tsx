import React from 'react';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { TextContainer } from '../TextContainer';

export const TransactionHeader = () => {
  return (
    <TextContainer bold ml={20} mt={15} mb={15}>
      {ASSET_DETAIL_CONTENT.transaction}
    </TextContainer>
  );
};
