import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { styleProvider, fontProvider, colorScheme } from 'shared/styles';
import { CustomHint } from '../CustomHint';
import { Icon } from '../Icon';

interface IProps {
  buy: boolean;
  onToggle: () => void;
}

export const InvestFundBuy = ({ buy, onToggle }: IProps) => {
  const [showHint, setShowHint] = React.useState(false);
  return (
    <View style={[styleProvider.centerHorizontal, styles.container]}>
      <Checkbox
        value={buy}
        onValueChange={() => onToggle()}
        label={APP_CONTENT.buyFromInvestFund.title}
        labelStyle={{ fontFamily: fontProvider.openSans, fontSize: 14 }}
        color={colorScheme.theme}
      />
      <CustomHint
        show={showHint}
        onPress={() => setShowHint(!showHint)}
        message={APP_CONTENT.buyFromInvestFund.explain}
      >
        <Icon.MaterialCommunity
          onPress={() => setShowHint(!showHint)}
          color={colorScheme.black200}
          size={25}
          style={{ marginLeft: 10 }}
          name="comment-question"
        />
      </CustomHint>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
