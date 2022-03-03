import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';
import { Icon } from '../icon';

interface IProps {
  renderItems: () => JSX.Element;
}

export const SpeedDial = ({ renderItems }: IProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const rotate = useDerivedValue(() => {
    return withTiming(isOpen ? 45 : 0, {
      duration: 100,
      easing: Easing.linear,
    });
  }, [isOpen]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotate.value}deg` }],
    };
  });

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.container}>
        {isOpen && renderItems()}
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          style={styles.button}
        >
          <Animated.View style={animatedStyles}>
            <Icon.Ioni size={25} color={colorScheme.white} name="add" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorScheme.theme,
    width: 60,
    height: 60,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    bottom: 20,
    right: 20,
    zIndex: 100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: colorScheme.loading,
  },
  view: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
