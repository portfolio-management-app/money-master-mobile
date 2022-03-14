import { Config } from 'config';
import {
  Settings,
  LoginManager,
  Profile,
  AccessToken,
} from 'react-native-fbsdk-next';
Settings.setAppID(Config.FacebookAppID);

export const facebookLogin = async () => {
  try {
    const res = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProfile = async () => {
  const res = await Profile.getCurrentProfile();

  return res;
};

export const facebookSignOut = () => {
  LoginManager.logOut();
};

export const getAccessToken = async () => {
  const token = await AccessToken.getCurrentAccessToken();

  return token;
};
