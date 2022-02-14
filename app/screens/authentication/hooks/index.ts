import { googleSignIn } from 'services/google-auth';
import {
  facebookLogin,
  getProfile,
  getAccessToken,
} from 'services/facebook-auth';
import { LocaleStore } from 'shared/stores';
import { useCallback, useEffect, useState } from 'react';
import { Validator } from 'utils/validator';
import { UserStore } from 'shared/stores/data-store';

export const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState({
    emailError: true,
    passwordError: true,
    emailMessage: '',
    passwordMessage: '',
  });
  const { locale } = LocaleStore;

  useEffect(() => {
    const result = Validator.validatePassword(password);

    if (result.value === 'Medium' || result.value === 'Strong') {
      setError({
        ...error,
        passwordError: false,
        passwordMessage: '',
      });
    }
  }, [password]);

  useEffect(() => {
    const result = Validator.validateEmail(email);
    if (result) {
      setError({ ...error, emailError: false, emailMessage: '' });
    }
  }, [email]);

  const submit = async (type: 'login' | 'register') => {
    if (!Validator.validateEmail(email)) {
      setError({
        ...error,
        emailError: true,
        emailMessage: locale.authenError.email,
      });
    }
    const result = Validator.validatePassword(password).value;
    if (result === 'Too weak' || result === 'Weak') {
      //Merge state
      setError((prev) => {
        return {
          ...prev,
          passwordError: true,
          passwordMessage: locale.authenError.password,
        };
      });
    }

    if (!error.emailError && !error.passwordError) {
      if (type === 'login') {
        setLoading(true);
        const res = await UserStore.login(email, password);
        setLoading(false);
        return res;
      } else {
        setLoading(true);
        const res = await UserStore.register(email, password);
        setLoading(false);
        return res;
      }
    }
    return null;
  };

  return [loading, setEmail, setPassword, error, submit] as const;
};

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

  return [loading, handleFaceBookLogin, handleGoogleLogin] as const;
};
