export const vn = {
  lang: 'vn',
  greetingPage: {
    login: 'ĐĂNG NHẬP',
    register: 'ĐĂNG KÝ',
    intro: 'Ứng dụng quản lý tài sản cá nhân',
  },
  loginPage: {
    google: 'ĐĂNG NHẬP VỚI GOOGLE',
    facebook: 'ĐĂNG NHẬP VỚI FACEBOOK',
    header: 'Đăng nhập',
    register: 'Đăng kí',
    placeHolder: {
      email: 'Email',
      password: 'Mật khẩu',
    },
    forgetPassword: 'Quên mật khẩu ?',
    signUpLink: 'Không có tài khoản ?',
  },
  registerPage: {
    google: 'ĐĂNG KÍ VỚI GOOGLE',
    facebook: 'ĐĂNG KÍ VỚI FACEBOOK',
    header: 'Đăng ký',
    login: 'Đăng nhập',
    placeHolder: {
      email: 'Email',
      password: 'Mật khẩu',
    },
    signInLink: 'Đã có tài khoản ?',
  },
  authenError: {
    email: 'Email không hợp lệ',
    password: 'Mật khẩu phải chứa ít nhất 8 kí tự bao gồm cả số và chữ cái',
    register: {
      existedEmail: 'Email đã tồn tại',
    },
    login: {
      credentialFailed: 'Sai tên đăng nhập hoặc mật khẩu',
      notExist: 'Email không tồn tại',
    },
  },

  forgetPasswordPage: {
    header: 'Đặt lại mật khẩu',
    send: 'GỬI',
  },
  bottomTab: {
    dashboard: 'Trang chủ',
    portfolio: 'Tài sản',
    marketCap: 'Thị trường',
    account: 'Tài khoản',
  },
  formErrors: {
    mustBeANumber: 'Value must be a number and greater than 0',
    requiredFiled: 'Trường này không được trống',
    email: 'Email không hợp lệ',
    password: 'Mật khẩu từ 8-32 kí tự và chứa cả chữ cái và số',
  },
  searchBar: {
    placeholder: 'Tìm kiếm',
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
  portfolioDetail: {
    tabs: {
      holding: 'Holdings',
      brief: 'Brief',
      report: 'Report',
      note: 'Note',
      payout: 'Payout',
    },
    assetPicker: {
      title: 'Choose an asset type',
      nft: 'NTF',
      stock: 'Stock',
      banking: 'Banking',
      realEaster: 'Real easter',
      other: 'Other',
      cash: 'Cash',
    },
    createOtherModal: {
      header: 'New portfolio',
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
