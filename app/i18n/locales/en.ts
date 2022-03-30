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
    chooseLanguage: 'Choose a language',
    reloadApp: 'Reload app to apply change?',
    later: 'Later',
    signOutConfirm: 'Sign out this account?',
    notificationSetting: {
      email: 'Email',
      inApp: 'In app',
      header: 'Notification setting',
    },
    shareContent:
      'Money master, number one portfolio management application. Install now at: ',
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
      realEstate: 'Real estate',
      other: 'Other',
      cash: 'Currency',
    },
    createOtherModal: {
      header: 'Other',
      create: 'Create',
      name: 'Name',
      balance: 'Initial balance',
      description: 'Description',
      selectCurrency: 'Selected currency',
      rate: 'Interest rate(%)',
      termRange: 'Term range (month)',
      startDate: 'Start date',
      update: 'Update',
    },
    bankingModal: {
      name: 'Bank Name',
      description: 'Description',
      reinState: 'Is rein state',
      reinStateExplain:
        'If not tick, the money will be automatically draw back to cash when term range end',
    },
    realEstateModal: {
      name: 'Estate Name',
      description: 'Description',
      currentPrice: 'Current price',
      buyPrice: 'Buy price',
      startDate: 'Start date',
      create: 'Create',
    },
  },
  assetDetail: {
    headerBanking: 'Banking  information',
    headerCrypto: 'Crypto  information',
    headerStock: 'Stock information',
    headerRealEaster: 'Real estate information',
    headerOther: 'Asset information',
    buy: 'Buy',
    transfer: 'Transfer',
    import: 'Import',
    export: 'Export',
    information: 'Information',
    transaction: 'Transaction history',
    edit: 'Edit',
    draw: 'Draw',
    startDate: 'Start date',
    bankName: 'Bank name',
    description: 'Description',
    none: 'None',
    delete: 'Delete',
  },

  confirmModal: {
    confirm: 'OK',
    cancel: 'Cancel',
  },
  marketCap: {
    crypto: 'Crypto',
    metal: 'Metal',
    stock: 'Stock',
    currency: 'Currency',
    noData: 'No data',
    cryptoSearchPlaceholder: 'Enter coin name',
    stockSearchPlaceholder: 'Enter stock symbol',
    currencySearchPlaceholder: 'Enter currency symbol',
    lastUpdate: 'Last update',
    gold: 'Gold',
    silver: 'Silver',
    price: 'Price',
    priceChange: 'Price change (24h)',
    base: 'Base',
    value: 'Value',
  },
  cryptoDetail: {
    buy: 'Buy',
    sell: 'Sell',
    range: {
      D: 'DAY',
      W: 'WEEK',
      M: 'MONTH',
      Y: 'YEAR',
    },
    circulatingSupply: 'Circulating supply',
    marketCapRank: 'Market cap rank',
    maxSupply: 'Max supply',
    ath: 'ATH',
    athDate: 'ATH Date',
    lastUpdate: 'Last update',
  },
  stockDetail: {
    buy: 'Buy',
    sell: 'Sell',
    range: {
      H: 'HOUR',
      D: 'DAY',
      W: 'WEEK',
      M: 'MONTH',
    },
    open: 'Open',
    close: 'Close',
    high: 'High',
    low: 'Low',
    exchangeTimeZone: 'Exchange timezone',
    exchange: 'Exchange',
    currency: 'Currency',
    date: 'Date',
  },
  next: 'Next',
  createAssetType: {
    name: 'Asset type name',
    header: 'Create new asset type',
    create: 'Create',
  },
  bankAssetDetail: {
    editTitle: 'Edit bank asset',
  },
  selectCurrency: 'Select currency',
  statistic: 'Statistic',
  total: 'Total',
  portfolio: 'portfolio',
  addMarketAsset: {
    amount: 'Amount',
    price: 'Price',
    currentPrice: 'Current price',
    add: 'Add',
  },
  currency: 'Currency',
};
