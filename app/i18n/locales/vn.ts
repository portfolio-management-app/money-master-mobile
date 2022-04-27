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
    setting: 'Cài đặt',
  },
  formErrors: {
    mustBeANumber: 'Giá trị phải là số lớn hơn 0',
    requiredFiled: 'Trường này không được trống',
    email: 'Email không hợp lệ',
    password: 'Mật khẩu từ 8-32 kí tự và chứa cả chữ cái và số',
    lessThan100: 'Lãi suất phải lớn hơn 0 và bé hơn 100',
  },
  searchBar: {
    placeholder: 'Tìm kiếm',
  },
  toastHeader: {
    error: 'Lỗi',
    success: 'Thành công',
    info: 'Thông báo',
    warning: 'Cẩn trọng',
  },
  portfolioCreateModal: {
    header: 'Khoản đầu tư mới',
    create: 'Tạo',
    name: 'Tên',
    balance: 'Vốn ban đầu',
    selectCurrency: 'Loại tiền tệ',
  },

  currencyPicker: {
    currency: 'Tiền tệ',
    search: 'Tìm kiếm',
  },
  setting: {
    appInfo: 'Thông tin ứng dụng',
    accountInfo: 'Thông tin tài khoản',
    joinDate: 'Ngày tham gia',
    useImage: 'Ứng dụng sử dụng hình ảnh từ',
    language: 'Ngôn ngữ',
    feedBack: 'Góp ý',
    notification: 'Thông báo',
    share: 'Chia sẻ ứng dụng này',
    signOut: 'Đăng xuất',
    chooseLanguage: 'Chọn ngôn ngữ',
    reloadApp: 'Load lại ứng dụng để cập nhật thay đổi ?',
    later: 'Để sau',
    signOutConfirm: 'Đăng xuất khỏi tài khoản này?',
    notificationSetting: {
      email: 'Email',
      inApp: 'Thông báo trong ứng dụng',
      header: 'Cài đặt thông báo',
    },
    shareContent: 'Money master, ứng dụng đầu tư số một, tải ngay tại: ',
  },
  portfolioDetail: {
    tabs: {
      holding: 'Tài sản',
      brief: 'Biểu đồ',
      report: 'Báo cáo',
      note: 'Ghi chú',
      payout: 'Trả',
      investFund: 'Quỹ đầu tư',
    },
    assetPicker: {
      title: 'Chọn loại tài sản',
      nft: 'Tiền điện tử',
      stock: 'Cổ phiếu',
      banking: 'Ngân hàng',
      realEstate: 'Bất động sản',
      other: 'Khác',
      cash: 'Ngoại tệ',
      metal: 'Kim loại quý',
    },
    createOtherModal: {
      header: 'Tạo tài sản mới',
      create: 'Tạo',
      name: 'Tên',
      balance: 'Giá trị ban đầu',
      selectCurrency: 'Loại tiền tệ',
      rate: 'Lãi suất (%)',
      termRange: 'Kì hạn (tháng)',
      startDate: 'Ngày bắt đầu',
      description: 'Mô tả',
      update: 'Cập nhật',
    },
    bankingModal: {
      name: 'Tên ngân hàng',
      description: 'Mô tả',
      reinState: 'Đáo hạn',
      reinStateExplain:
        'Nếu không chọn trường này số tiền gửi ngân hàng sẽ được chuyển vè tài khoản chính khi đến kì hạn',
    },
    realEstateModal: {
      name: 'Tên bất động sản',
      description: 'Mô tả',
      currentPrice: 'Giá hiện tại',
      buyPrice: 'Giá mua',
      startDate: 'Ngày mua',
      create: 'Tạo',
    },
  },
  assetDetail: {
    headerBanking: 'Thông tin ngân hàng',
    headerCrypto: 'Thông tin tiền điện tử',
    headerStock: 'Thông tin cổ phiếu',
    headerRealEaster: 'Thông tin bất động sản',
    headerOther: 'Thông tin tài sản',
    buy: 'Mua',
    transfer: 'Chuyển',
    import: 'Import',
    export: 'Export',
    information: 'Thông tin',
    transaction: 'Lịch sử giao dịch',
    edit: 'Chỉnh sửa',
    draw: 'Rut',
    startDate: 'Ngày bắt đầu',
    bankName: 'Tên ngân hàng',
    description: 'Mô tả',
    none: 'Không có',
    delete: 'Xóa',
    realEstateName: 'Tên bất động sản',
    coinName: 'Tên',
    coinCode: 'Mã crypto',
    buyPrice: 'Giá mua',
    currentPrice: 'Gía hiện tại',
    buyDate: 'Ngày mua',
    amountHolding: 'Số lượng nắm giữ',
    stockCode: 'Mã cổ phiếu',
    name: 'Tên',
    transferOption: {
      title: 'Chuyển tới',
      portfolio: 'Khoản đầu tư khác',
      fund: 'Quỹ đầu tư',
    },
    profit: 'Lợi nhuận',
  },
  confirmModal: {
    confirm: 'OK',
    cancel: 'Hủy',
  },
  marketCap: {
    crypto: 'Tiền điện tử',
    metal: 'Kim loại quý',
    stock: 'Cổ phiếu',
    currency: 'Ngoại tệ',
    noData: 'Không có dữ liệu',
    cryptoSearchPlaceholder: 'Nhập tên coin',
    stockSearchPlaceholder: 'Nhập tên cổ phiếu',
    currencySearchPlaceholder: 'Nhập biểu tượng tiền tệ',
    lastUpdate: 'Cập nhật lần cuối',
    gold: 'Vàng',
    silver: 'Bạc',
    price: 'Giá hiện tại',
    priceChange: 'Giá thay đổi (24h)',
    base: 'Cơ bản',
    value: 'Giá trị',
  },
  cryptoDetail: {
    buy: 'Mua',
    sell: 'Bán',
    range: {
      D: 'NGÀY',
      W: 'TUẦN',
      M: 'THÁNG',
      Y: 'NĂM',
    },
    circulatingSupply: 'Hiện cung',
    marketCapRank: 'Xếp hạng thị trường',
    maxSupply: 'Nguồn cung tối đa',
    ath: 'ATH',
    athDate: 'Ngày đạt ATH',
    lastUpdate: 'Cập nhật lần cuối',
  },
  stockDetail: {
    buy: 'Bán',
    sell: 'Mua',
    range: {
      H: 'GIỜ',
      D: 'NGÀY',
      W: 'TUẦN',
      M: 'THÁNG',
    },
    open: 'Giá mở cửa',
    close: 'Giá đóng cửa',
    high: 'Cao',
    low: 'Thấp',
    exchangeTimeZone: 'Múi giờ giao dịch',
    exchange: 'Sàn giao dịch',
    currency: 'Mệnh giá',
    date: 'Thời gian',
  },
  next: 'Tiếp theo',
  createAssetType: {
    name: 'Tên loại tài sản',
    header: 'Tạo mới loại tài sản',
    create: 'Tạo',
  },
  bankAssetDetail: {
    editTitle: 'Chỉnh sửa tài sản',
  },
  selectCurrency: 'Chọn đơn vị tiền tệ',
  statistic: 'Tổng quan',
  total: 'Tổng cộng',
  portfolio: 'tài sản',
  addMarketAsset: {
    amount: 'Số lương',
    price: 'Giá',
    currentPrice: 'Giá hiện tại',
    add: 'Thêm',
  },
  currency: 'Ngoại tệ',
  currencyList: {
    AUD: 'Đô la Úc',
    BTC: 'Bitcoin',
    GBP: 'Bảng Anh',
    CAD: 'Đô la Canada',
    CNY: 'Nhân dân tệ',
    EUR: 'Euro',
    HKD: 'Đô la Hồng Kông',
    INR: 'Ruble Ấn Độ',
    JPY: 'Yên Nhật',
    KPW: 'Won Hàn Quốc',
    SGD: 'Đô la Singapore',
    THB: 'Baht Thái',
    USD: 'Đô la Mỹ',
    VND: 'Việt Nam Đồng',
    RUB: 'Ruble Nga',
  },
  portfolioPicker: {
    header: 'Chọn khoản đầu tư',
  },
  buyScreen: {
    amount: 'Số lượng',
    buy: 'Mua',
    currencyPrice: 'Giá hiện tại',
    gold: 'Vàng',
    silver: 'Bạc',
    description: 'Mô tả',
    name: 'Tên',
    startDate: 'Ngày mua',
    purchasePrice: 'Giá mua',
    createSuccess: 'Giao dịch thành công',
  },
  metalDetailScreen: {
    gold: 'Vàng',
    silver: 'Bạc',
    buy: 'Mua',
    sell: 'Bán',
    close: 'Giá đóng cửa',
    change: 'Giá thay đổi (24h)',
  },
  buy: 'Mua',
  sell: 'Bán',
  action: 'Hành đông',
  cancel: 'Hủy',
  delete: 'Xóa',
  edit: 'Chỉnh sửa',
  realEstateAssetDetail: {
    header: 'Thông tin bất động sản',
    editModal: {
      title: 'Chỉnh sửa',
      name: 'Tên',
      buyPrice: 'Giá mua',
      currentPrice: 'Giá hiện tại',
    },
  },
  cryptoAssetDetail: {
    header: 'Thông tin tiền điện tử',
    editModal: {
      title: 'Chỉnh sửa',
      name: 'Tên',
      buyPrice: 'Giá mua',
    },
  },
  emptyData: 'Không có dữ liệu',
  transferToFund: {
    header: 'Chuyển tới quỹ đầu tư',
    amount: 'Số tiền chuyển',
    money: 'Số tiền',
    transfer: 'Chuyển',
    currentPrice: 'Giá hiện tại',
    currentHolding: 'Sở hữu',
    error: {
      notEnoughMoney: 'Số tiền còn lại của tài sản không đủ',
    },
    success: 'Chuyển thành công',
  },
  confirm: {
    ok: 'Ok',
    cancel: 'Hủy',
  },
  sellScreen: {
    amount: 'Amount',
    sell: 'Sell',
    title: 'Chọn tài sản',
    currencyPrice: 'Current price',
    gold: 'Gold',
    silver: 'Silver',
    description: 'Description',
    name: 'Name',
    startDate: 'Buy date',
    purchasePrice: 'Purchase price',
    createSuccess: 'Transaction success',
    noAsset: 'Không tìm thấy tài sản phù hợp',
  },
};
