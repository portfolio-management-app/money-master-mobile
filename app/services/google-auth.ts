import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleClientID } from 'config';
GoogleSignin.configure({
  webClientId: GoogleClientID,
  offlineAccess: true,
  profileImageSize: 120,
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const clearToken = (token: string | null) => {
  if (token) GoogleSignin.clearCachedAccessToken(token);
};

export const googleSignOut = async () => {
  await GoogleSignin.signOut();
};
