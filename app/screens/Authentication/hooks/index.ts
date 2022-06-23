import { getGoogleToken, googleSignIn } from 'services/google-auth';
import {
  facebookLogin,
  getProfile,
  getAccessToken,
} from 'services/facebook-auth';
import { useCallback, useState } from 'react';

export const useSocialLogin = () => {
  const [loading, setIsLoading] = useState(false);

  const handleFaceBookLogin = useCallback(async () => {
    setIsLoading(true);
    await facebookLogin();
    const profile = await getProfile();
    const accessToken = await getAccessToken();
    console.log();
    setIsLoading(false);
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    await googleSignIn();
    const token = await getGoogleToken();

    return token;
  }, []);

  return [
    loading,
    handleFaceBookLogin,
    handleGoogleLogin,
    setIsLoading,
  ] as const;
};
