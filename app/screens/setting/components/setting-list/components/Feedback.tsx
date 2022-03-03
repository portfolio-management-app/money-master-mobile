import React from 'react';
import { Icon } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { ICON_SIZE, SCREEN_CONTENT } from '../../constant';
import { Common } from './Common';
import { openComposer } from 'react-native-email-link';

export const Feedback = () => {
  const onSendFeedBack = () => {
    openComposer({
      to: 'moneymaster.co@gmail.com',
    });
  };
  return (
    <Common
      onPress={onSendFeedBack}
      icon={
        <Icon.Material
          size={ICON_SIZE}
          color={colorScheme.black200}
          name="feedback"
        />
      }
      title={SCREEN_CONTENT.feedBack}
    />
  );
};
