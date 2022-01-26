import { googleSignIn } from 'services/google-auth';
import { facebookLogin, getProfile } from 'services/facebook-auth';
import { LocaleStore } from 'stores/ui-store';
import { useCallback, useEffect, useState } from 'react';
import { validateEmail, validatePassword } from 'utils/validator';

export const useAuthentication = () => {
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
    const result = validatePassword(password);

    if (result.value === 'Medium' || result.value === 'Strong') {
      setError({
        ...error,
        passwordError: false,
        passwordMessage: '',
      });
    }
  }, [password]);

  useEffect(() => {
    const result = validateEmail(email);
    if (result) {
      setError({ ...error, emailError: false, emailMessage: '' });
    }
  }, [email]);

  const submit = async (type: 'login' | 'register') => {
    if (!validateEmail(email)) {
      setError({
        ...error,
        emailError: true,
        emailMessage: locale.authenError.email,
      });
    }
    const result = validatePassword(password).value;
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

    if (error.emailError && error.passwordError) {
      if (type === 'login') {
        //Login
      } else {
        //Register
      }
    }
  };

  return [setEmail, setPassword, error, submit] as const;
};

export const useSocialLogin = () => {
  const [loading, setIsLoading] = useState(false);

  const handleFaceBookLogin = useCallback(async () => {
    setIsLoading(true);
    await facebookLogin();
    const profile = await getProfile();
    console.log(profile);
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
