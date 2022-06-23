import React from 'react';
import { CustomToast } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { ErrorBounderProps } from 'shared/types';

const ErrorLocale = APP_CONTENT.authenError.register;

export const ErrorBounder = ({ show, res, onClose }: ErrorBounderProps) => {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (res !== null) {
      switch (res.code) {
        case 400:
          setMessage(ErrorLocale.existedEmail);
          break;
        default:
          setMessage(APP_CONTENT.authenError.serverError);
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
