export const en = {
  lang: 'en',
  greetingPage: {
    login: 'SIGN IN',
    register: 'SIGN UP',
    intro: 'Portfolio management app',
  },
  loginPage: {
    google: 'SIGN IN WITH GOOGLE',
    facebook: 'SIGN IN WITH FACEBOOK',
    header: 'Sign in',
    placeHolder: {
      email: 'Email',
      password: 'Password',
    },
    forgetPassword: 'Forget password ?',
    signUpLink: "Don't have account ?",
  },
  registerPage: {
    google: 'SIGN UP WITH GOOGLE',
    facebook: 'SIGN UP WITH FACEBOOK',
    header: 'Sign up',
    placeHolder: {
      email: 'Email',
      password: 'Password',
    },
    signInLink: 'Already a member ?',
  },
  authenError: {
    email: 'Invalid email',
    password:
      'Password contains at least 8 character and have both number and character',
    register: {
      existedEmail: 'Email existed',
    },
    login: {
      credentialFailed: 'Credential failed',
      notExist: 'Email not exist',
    },
  },
  httpError: {
    default: 'An error occur',
  },
  forgetPasswordPage: {
    header: 'Reset password',
    send: 'SEND',
  },
  bottomTab: {
    transaction: 'Your wallet',
    category: 'Category',
    report: 'Report',
    account: 'Account',
  },
  portfolioCategory: {
    header: 'Portfolio category',
    headerContent: 'Management your assets',
    nonInterest: 'Volatility assets',
    interest: 'Interest bearing assets',
    realProperty: 'Real estate property',
    total: 'Sum quantity',
    cash: 'Cash',
    seeReport: 'See report',
  },
  nonInterestAssets: {
    coin: 'Coin',
    stock: 'Stock',
    gold: 'Gold',
    addModel: {
      name: 'Asset name',
      asset: 'Your current asset',
      startDate: 'Start date',
      add: 'Create',
      cancel: 'Cancel',
      header: 'Create new asset',
    },
  },
  interestAssets: {
    bank: 'Bank',
    addModel: {
      name: 'Asset name',
      asset: 'Your current asset',
      startDate: 'Start date',
      add: 'Create',
      cancel: 'Cancel',
      header: 'Create new asset',
      interestRate: 'Interest rate',
      interestValue: 'Interest value',
      interestType: 'Interest type: ',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      errors: {
        mustBeANumber: 'Value must be a number and greater than 0',
        requiredFiled: 'Field is required',
        lessThan100: 'Interest rate must be less than or equal 100',
      },
    },
  },
};
