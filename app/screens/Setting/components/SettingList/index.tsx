import React from 'react';
import {
  Feedback,
  Language,
  Notification,
  ShareApp,
  SignOut,
} from './components';

export const SettingList = () => {
  return (
    <>
      <Feedback />
      <Language />
      <Notification />
      <ShareApp />
      <SignOut />
    </>
  );
};
