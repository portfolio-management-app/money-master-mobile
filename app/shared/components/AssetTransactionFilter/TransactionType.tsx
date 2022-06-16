import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox, Dialog } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { TransactionType } from 'shared/types';
import { translateTransactionType } from 'utils/translation';
import { BaseButton } from '../Button';

const TYPES: Array<TransactionType> = [
  'addValue',
  'buyFromCash',
  'buyFromFund',
  'buyFromOutside',
  'moveToFund',
  'withdrawToCash',
  'withdrawToOutside',
];

interface IProps {
  show: boolean;
  onClose: () => void;
  onApply: (type: TransactionType | 'all') => void;
  type: TransactionType | 'all';
}

const Component = ({ show, onClose, onApply, type }: IProps) => {
  const [transactionType, setTransactionType] = React.useState<
    TransactionType | 'all'
  >('all');

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
              label={translateTransactionType(type)}
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
