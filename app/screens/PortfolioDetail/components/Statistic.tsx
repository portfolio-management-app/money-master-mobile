import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExpandableSection } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';

const Component = () => {
  const [openExpand, setOpenExpand] = React.useState(true);

  const toggle = () => {
    setOpenExpand(!openExpand);
  };
  return (
    <ExpandableSection
      expanded={openExpand}
      sectionHeader={<SectionHeader isOpen={openExpand} />}
      onPress={toggle}
    >
      <View style={styles.container}>
        <TextContainer light bold type="h1">
          $76 542.45
        </TextContainer>
        <TextContainer light>
          Open D/L:{' '}
          <TextContainer color={colorScheme.warning}>-7.24%</TextContainer>
        </TextContainer>
        <TextContainer light>
          Daily P/L:{' '}
          <TextContainer color={colorScheme.green200}>+4.24%</TextContainer>
        </TextContainer>
      </View>
    </ExpandableSection>
  );
};

const SectionHeader = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <View style={styles.selectionHeader}>
      <TextContainer type="h3" light>
        {APP_CONTENT.statistic}
      </TextContainer>
      {isOpen ? (
        <Icon.Evil color={colorScheme.white} size={30} name="chevron-down" />
      ) : (
        <Icon.Evil color={colorScheme.white} size={30} name="chevron-right" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.theme,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectionHeader: {
    backgroundColor: colorScheme.theme,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export const Statistic = React.memo(Component);
