import { googleSignIn } from 'services/google-auth';
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
    console.log(profile, accessToken);
    setIsLoading(false);
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    setIsLoading(true);
    const user = await googleSignIn();
    console.log(user);
    setIsLoading(false);
  }, []);

  return [
    loading,
    handleFaceBookLogin,
    handleGoogleLogin,
    setIsLoading,
  ] as const;
};
