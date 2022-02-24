import { i18n } from 'i18n';
import React from 'react';
import { localeKey } from 'services/storage';
import { CustomToast } from 'shared/components';
import { ErrorBounderProps } from 'shared/types';

const ErrorLocale = i18n[localeKey].authenError.login;

export const ErrorBounder = ({ show, res, onClose }: ErrorBounderProps) => {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (res !== null) {
      switch (res.code) {
        case 401:
          setMessage(ErrorLocale.credentialFailed);
          break;
        case 400:
          setMessage(ErrorLocale.notExist);
      }
    }
  }, [res]);

  return (
    <CustomToast
      variant="error"
      show={show}
      message={message}
      onDismiss={() => onClose()}
    />
  );
};
