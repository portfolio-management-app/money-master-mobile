import React from 'react';
import { CustomToast } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { ErrorBounderProps } from 'shared/types';

const ErrorLocale = APP_CONTENT.authenError.login;

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
