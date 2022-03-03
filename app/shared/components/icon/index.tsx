import React from 'react';
import { IconProps } from 'react-native-vector-icons/Icon';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';

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
  FontAwesome5: (props: IconProps) => {
    return <FontAwesomeIcon5 {...props} />;
  },
  Feather: (props: IconProps) => {
    return <FeatherIcon {...props} />;
  },
  Ioni: (props: IconProps) => {
    return <IoniIcon {...props} />;
  },
  SimpleLine: (props: IconProps) => {
    return <SimpleLineIcon {...props} />;
  },
  Evil: (props: IconProps) => {
    return <EvilIcons {...props} />;
  },
};
