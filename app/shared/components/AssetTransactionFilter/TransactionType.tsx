import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox, Dialog } from 'react-native-ui-lib';
import { APP_CONTENT, TRANSACTION_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionFilterType } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { BaseButton } from '../Button';

const TYPES: Array<ITransactionFilterType> = ['in', 'out'];

interface IProps {
  show: boolean;
  onClose: () => void;
  onApply: (type: ITransactionFilterType) => void;
  type: ITransactionFilterType;
}

const Component = ({ show, onClose, onApply, type }: IProps) => {
  const [transactionType, setTransactionType] =
    React.useState<ITransactionFilterType>('all');

  React.useEffect(() => {
    setTransactionType(type);
  }, [type]);

  return (
    <Dialog onDismiss={onClose} visible={show} bottom>
      <ScrollView>
        <View style={styleProvider.bottomDialog}>
          <Checkbox
            containerStyle={styles.checkBox}
            value={transactionType === 'all'}
            onValueChange={() => setTransactionType('all')}
            color={colorScheme.theme}
            label={APP_CONTENT.transactionFilter.all}
          />
          {TYPES.map((type) => (
            <Checkbox
              containerStyle={styles.checkBox}
              value={transactionType === type}
              onValueChange={() => setTransactionType(type)}
              color={colorScheme.theme}
              key={type}
              label={translateType(type)}
            />
          ))}
          <BaseButton
            onPress={() => onApply(transactionType)}
            backgroundColor={colorScheme.theme}
            style={{ marginTop: 10 }}
            label={APP_CONTENT.transactionFilter.apply}
          />
        </View>
      </ScrollView>
    </Dialog>
  );
};

export const TransactionTypePicker = React.memo(Component);

const styles = StyleSheet.create({
  checkBox: {
    paddingVertical: 10,
  },
});

const translateType = (type: ITransactionFilterType) => {
  switch (type) {
    case 'all':
      return 'All';
    case 'in':
      return TRANSACTION_DETAIL_CONTENT.in;
    case 'out':
      return TRANSACTION_DETAIL_CONTENT.out;
    default:
      return '';
  }
};
