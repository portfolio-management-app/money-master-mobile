import React from 'react';
import {
  Feedback,
  Language,
  Notification,
  Security,
  ShareApp,
  SignOut,
} from './components';

export const SettingList = () => {
  return (
    <>
      <Feedback />
      <Language />
      <Notification />
      <Security />
      <ShareApp />
      <SignOut />
    </>
  );
};
