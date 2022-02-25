import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, PlatformView, TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  title?: string;
  headerStyle?: 'light-content' | 'dark-content';
  bgColor?: string;
  renderRightItem?: () => JSX.Element;
}

export const NavigationHeader = ({
  title,
  headerStyle = 'dark-content',
  bgColor = colorScheme.white,
  renderRightItem,
}: IProps) => {
  const navigation = useNavigation();
  const iconColor = React.useMemo(() => {
    if (headerStyle === 'light-content') {
      return colorScheme.white;
    }
    return colorScheme.black200;
  }, [headerStyle]);

  return (
    <PlatformView
      style={[styles.headerContainer, { backgroundColor: bgColor }]}
    >
      <View style={styles.leftContent}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => navigation.goBack()}
        >
          <Icon.Entypo name="chevron-left" size={35} color={iconColor} />
        </TouchableOpacity>

        <TextContainer color={iconColor} bold type="h4">
          {title ? title : ''}
        </TextContainer>
      </View>

      {renderRightItem && renderRightItem()}
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});
