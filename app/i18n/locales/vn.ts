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
      existedEmail: 'Email existed',
    },
    login: {
      credentialFailed: 'Credential failed',
      notExist: 'Email not exist',
    },
  },

  forgetPasswordPage: {
    header: 'Đặt lại mật khẩu',
    send: 'GỬI',
  },
  bottomTab: {
    transaction: 'Ví của bạn',
    category: 'Tài sản',
    report: 'Báo cáo',
    account: 'Tài khoản',
  },
  portfolioCategory: {
    header: 'Các loại tài sản',
    headerContent: 'Quản lí các loại tài sản của bạn',
    nonInterest: 'Tài sản biến động',
    interest: 'Tài khoản sinh lãi',
    realProperty: 'Bất động sản',
    cash: 'Tiền mặt',
    total: 'Tổng tài sản',
    seeReport: 'Xem báo cáo',
  },
  nonInterestAssets: {
    coin: 'Tiền điện tử',
    stock: 'Chứng khoán',
    gold: 'Vàng',
    addModel: {
      name: 'Tên tài sản',
      asset: 'Số lượng sở hữu hiện tại',
      startDate: 'Ngày bắt đầu',
      add: 'Thêm',
      cancel: 'Hủy',
      header: 'Tạo loại tài sản mới',
    },
  },
  interestAssets: {
    bank: 'Tiền gửi ngân hàng',
    addModel: {
      name: 'Tên tài sản',
      asset: 'Số lượng sở hữu hiện tại',
      startDate: 'Ngày bắt đầu',
      add: 'Thêm',
      cancel: 'Hủy',
      header: 'Tạo loại tài sản mới',
      interestRate: 'Lãi suất',
      interestValue: 'Thời gian kỳ hạn',
      interestType: 'Loại kỳ hạn: ',
      week: 'Tuần',
      month: 'Tháng',
      year: 'Năm',
    },
  },
  httpError: {
    default: 'An error occur',
  },
};
