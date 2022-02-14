import { Options, passwordStrength } from 'check-password-strength';

const passwordOption: Options<string> = [
  {
    id: 0,
    value: 'Too weak',
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: 'Weak',
    minDiversity: 0,
    minLength: 6,
  },
  {
    id: 2,
    value: 'Medium',
    minDiversity: 2,
    minLength: 8,
  },
  {
    id: 3,
    value: 'Strong',
    minDiversity: 4,
    minLength: 10,
  },
];

export type PasswordValidateResult = 'Too weak' | 'Weak' | 'Medium' | 'Strong';

export class Validator {
  static validateEmail(email: string): boolean {
    const result = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return result !== null;
  }
  static validatePassword(password: string) {
    const result = passwordStrength(password, passwordOption);
    const value: PasswordValidateResult =
      result.value as PasswordValidateResult;
    return {
      value: value,
      contains: result.contains,
    };
  }
  static validateNumber(num: any) {
    return !isNaN(num * 1);
  }
  static validateStringEmpty(s: string) {
    return s.trim() !== '';
  }
}
