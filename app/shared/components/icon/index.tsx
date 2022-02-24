import React from 'react';
import { IconProps } from 'react-native-vector-icons/Icon';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export const Icon = {
  Material: (props: IconProps) => {
    return <MaterialIcon {...props} />;
  },
  Entypo: (props: IconProps) => {
    return <EntypoIcon {...props} />;
  },
  MaterialCommunity: (props: IconProps) => {
    return <MaterialCommunityIcon {...props} />;
  },
  FontAwesome: (props: IconProps) => {
    return <FontAwesomeIcon {...props} />;
  },
};
