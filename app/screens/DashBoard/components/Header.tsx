import React from 'react';
import { View } from 'react-native';
import { Icon, TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';

export const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <View>
        <TextContainer type="h2" bold>
          Today
        </TextContainer>
        <TextContainer>
          {parseToString(new Date(), { withTime: false })}
        </TextContainer>
      </View>
      <Icon.Material name="notifications" size={35} color={colorScheme.theme} />
    </View>
  );
};
