import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';
import { Icon } from '../icon';
import { TextContainer } from '../text-container';

interface IProps {
  title: string;
  buttonLabel?: string;
  hasRightButton?: boolean;
  onClose?: () => void;
  onCreate?: () => void;
  bgColor?: string;
  headerStyle?: 'light-content' | 'dark-content';
}

export const CreateModalHeader = ({
  title,
  onClose,
  onCreate,
  buttonLabel,
  hasRightButton = true,
  bgColor = colorScheme.white,
  headerStyle = 'dark-content',
}: IProps) => {
  const color = React.useMemo(() => {
    if (headerStyle == 'light-content') return colorScheme.white;
    return colorScheme.black200;
  }, [headerStyle]);

  return (
    <View style={[styles.modal, { backgroundColor: bgColor }]}>
      <Icon.Evil color={color} size={30} name="close" onPress={onClose} />
      <TextContainer color={color}>{title}</TextContainer>
      {hasRightButton ? (
        <TouchableOpacity onPress={onCreate}>
          <TextContainer
            color={headerStyle === 'light-content' ? color : colorScheme.theme}
          >
            {buttonLabel}
          </TextContainer>
        </TouchableOpacity>
      ) : (
        <TextContainer>{'         '}</TextContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
