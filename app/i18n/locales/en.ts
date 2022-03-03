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
    register: 'Sign up',
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
    login: 'Sign in',
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
    dashboard: 'Dashboard',
    portfolio: 'Portfolios',
    marketCap: 'Market cap',
    setting: 'Setting',
  },
  formErrors: {
    mustBeANumber: 'Value must be a number and greater than 0',
    requiredFiled: 'Field is required',
    mustBeInteger: 'Interest value must be an integer',
    lessThan100: 'Interest rate must be less than or equal 100',
    email: 'Email invalid',
    password: 'Password must contain character and number, len > 8',
  },
  searchBar: {
    placeholder: 'Search...',
  },
  toastHeader: {
    error: 'Error',
    success: 'Success',
    info: 'Info',
    warning: 'Warning',
  },
  portfolioCreateModal: {
    header: 'New portfolio',
    create: 'Create',
    name: 'Name',
    balance: 'Initial balance',
    selectCurrency: 'Selected currency',
  },

  currencyPicker: {
    currency: 'Currency',
    search: 'Search currency',
  },
  setting: {
    appInfo: 'App info',
    accountInfo: 'Account info',
    joinDate: 'Join date',
    useImage: 'App use image from',
    language: 'Language',
    feedBack: 'Feedback',
    notification: 'Notification',
    share: 'Share this app',
    signOut: 'Sign out',
  },

  portfolioDetail: {
    tabs: {
      holding: 'Holdings',
      brief: 'Brief',
      report: 'Report',
      note: 'Notes',
      payout: 'Payout',
    },
    assetPicker: {
      title: 'Choose an asset type',
      nft: 'Crypto currency',
      stock: 'Stock',
      banking: 'Banking',
      realEaster: 'Real easter',
      other: 'Other',
      cash: 'Cash',
    },
    createOtherModal: {
      header: 'Other',
      create: 'Create',
      name: 'Name',
      balance: 'Initial balance',
      selectCurrency: 'Selected currency',
      rate: 'Interest rate(%)',
      termRange: 'Term range (month)',
      startDate: 'Start date',
    },
    bankingModal: {
      name: 'Bank Name',
    },
  },
  assetDetail: {
    headerBanking: 'Banking  information',
    headerCrypto: 'Crypto  information',
    headerStock: 'Stock information',
    headerRealEaster: 'Real easter information',
    headerOther: 'Asset information',
    buy: 'Buy',
    transfer: 'Transfer',
    import: 'Import',
    export: 'Export',
    information: 'Information',
    transaction: 'Transaction history',
    edit: 'Edit',
  },
};
