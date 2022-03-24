import React from 'react';
import { StyleSheet } from 'react-native';
import { Checkbox, View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import { CustomHint, Icon } from 'shared/components';
import { colorScheme, fontProvider, styleProvider } from 'shared/styles';

interface IProps {
  reinState: boolean;
  onToggle: () => void;
}
export const ReinStateCheckBox = ({ reinState, onToggle }: IProps) => {
  const [showHint, setShowHint] = React.useState(false);
  return (
    <View style={[styleProvider.centerHorizontal, styles.container]}>
      <Checkbox
        value={reinState}
        onValueChange={() => onToggle()}
        label={SCREEN_CONTENT.bankingModal.reinState}
        labelStyle={{ fontFamily: fontProvider.openSans, fontSize: 16 }}
        color={colorScheme.theme}
      />
      <CustomHint
        show={showHint}
        onPress={() => setShowHint(!showHint)}
        message={SCREEN_CONTENT.bankingModal.reinStateExplain}
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
