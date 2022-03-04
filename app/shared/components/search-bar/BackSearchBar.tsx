import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Icon } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps extends TextInputProps {
  onPressBack?: () => void;
}

const Component = ({ onPressBack, ...res }: IProps) => {
  const inputRef: any = React.useRef();
  return (
    <View style={styles.searchContainer}>
      <Icon.Evil
        size={60}
        color={colorScheme.white}
        name="chevron-left"
        onPress={onPressBack}
      />
      <View style={styles.searchWrapper}>
        <TextInput
          ref={inputRef}
          onLayout={() => inputRef.current.focus()}
          placeholderTextColor={colorScheme.gray100}
          style={styles.searchField}
          selectionColor={colorScheme.white}
          autoFocus
          {...res}
        />
      </View>
    </View>
  );
};

export const BackSearchBar = React.memo(Component);

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colorScheme.theme,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchWrapper: {
    borderColor: colorScheme.white,
    borderWidth: 0.5,
    width: '80%',
    borderRadius: 10,
  },
  searchField: {
    color: colorScheme.white,
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
