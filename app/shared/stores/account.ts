import { translateUpdatePasswordMessage } from './../../utils/translation/update-password';
import { UserStore } from 'shared/stores';
import { translateResetPasswordMessage } from 'utils/translation';
import { Config } from 'config';
import { httpRequest } from 'services/http';
import { types, flow } from 'mobx-state-tree';
import {
  OTPVerifyBody,
  RequestForgetPasswordBody,
  ResetPasswordBody,
  UpdatePasswordBody,
} from './types';
import { HttpError } from 'errors/base';
import { Response } from 'shared/models';
import { log } from 'services/log';
export const AccountStore = types
  .model('AccountStore', {
    response: Response,
  })
  .actions((self) => {
    const requestForgetPassword = flow(function* (
      body: RequestForgetPasswordBody
    ) {
      self.response.makePending();
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/account/forgetPassword`,
        body
      );
      if (res instanceof HttpError) {
        self.response.stopPending();
        res.setMessage(translateResetPasswordMessage(res));
        self.response.makeError(res);
        return false;
      } else {
        self.response.stopPending();

        return true;
      }
    });
    const verifyOtp = flow(function* (body: OTPVerifyBody) {
      self.response.makePending();
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/account/otp`,
        body
      );
      if (res instanceof HttpError) {
        self.response.stopPending();
        res.setMessage(translateResetPasswordMessage(res));
        self.response.makeError(res);
        return false;
      } else {
        self.response.stopPending();
        return true;
      }
    });

    const requestForgetPasswordAgain = flow(function* (
      body: RequestForgetPasswordBody
    ) {
      self.response.makePending();
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/account/forgetPassword`,
        body
      );
      if (res instanceof HttpError) {
        self.response.stopPending();
        res.setMessage(translateResetPasswordMessage(res));
        self.response.makeError(res);
        return false;
      } else {
        self.response.stopPending();
        self.response.makeSuccess();
        return true;
      }
    });

    const resetPassword = flow(function* (body: ResetPasswordBody) {
      self.response.makePending();
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/account/resetPassword`,
        body
      );
      if (res instanceof HttpError) {
        self.response.stopPending();
        res.setMessage(translateResetPasswordMessage(res));
        self.response.makeError(res);
        return false;
      } else {
        self.response.stopPending();
        self.response.makeSuccess();
        return true;
      }
    });

    const updatePassword = flow(function* (body: UpdatePasswordBody) {
      self.response.makePending();
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/account/password`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when update password', res);
        res.setMessage(translateUpdatePasswordMessage(res));
        self.response.stopPending();
        self.response.makeError(res);
      } else {
        self.response.stopPending();
        self.response.makeSuccess();
      }
    });
    return {
      requestForgetPassword,
      verifyOtp,
      resetPassword,
      requestForgetPasswordAgain,
      updatePassword,
    };
  })
  .create({
    response: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
