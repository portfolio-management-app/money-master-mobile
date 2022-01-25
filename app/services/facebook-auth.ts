import { FacebookAppID } from 'config';
import { Settings, LoginManager, Profile } from 'react-native-fbsdk-next';
Settings.setAppID(FacebookAppID);

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
