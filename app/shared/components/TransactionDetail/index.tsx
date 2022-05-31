import React from 'react';
import { Dialog, PanningProvider, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { APP_CONTENT, TRANSACTION_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { dimensionProvider, colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';
import {
  translateAssetType,
  translateTransactionType,
} from 'utils/translation';

interface IProps {
  open: boolean;
  onClose: () => void;
  info?: ITransactionItem;
}

const Component = ({ open, onClose, info }: IProps) => {
  return (
    <Dialog
      useSafeArea
      width={dimensionProvider.width}
      visible={open}
      onDismiss={onClose}
      bottom
      containerStyle={{ backgroundColor: colorScheme.white }}
      panDirection={PanningProvider.Directions.DOWN}
    >
      {info && <Item info={info} />}
    </Dialog>
  );
};

const Item = ({ info }: { info: ITransactionItem }) => {
  return (
    <View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
      <TextContainer mb={10}>
        <TextContainer semiBold>
          {TRANSACTION_DETAIL_CONTENT.amount}:{' '}
        </TextContainer>

        {formatCurrency(info.amount, info.currencyCode)}
      </TextContainer>
      <TextContainer mb={10}>
        <TextContainer semiBold>
          {TRANSACTION_DETAIL_CONTENT.date}:{' '}
        </TextContainer>

        {parseToString(new Date(info.createdAt))}
      </TextContainer>
      <TextContainer mb={10}>
        <TextContainer semiBold>
          {TRANSACTION_DETAIL_CONTENT.type}:{' '}
        </TextContainer>
        {translateTransactionType(info.singleAssetTransactionType)}
      </TextContainer>

      <TextContainer mb={10}>
        <TextContainer semiBold>{APP_CONTENT.fee}: </TextContainer>
        {info.fee} (%)
      </TextContainer>
      <TextContainer mb={10}>
        <TextContainer semiBold>{APP_CONTENT.tax}: </TextContainer>
        {info.tax} (%)
      </TextContainer>
    </View>
  );
};

export const TransactionDetailModal = React.memo(Component);
