import { i18n } from 'i18n';
import React from 'react';
import { localeKey } from 'services/storage';
import { CustomToast } from 'shared/components';
import { ErrorBounderProps } from 'shared/types';

const ErrorLocale = i18n[localeKey].authenError.register;

export const ErrorBounder = ({ show, res, onClose }: ErrorBounderProps) => {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (res !== null) {
      switch (res.code) {
        case 400:
          setMessage(ErrorLocale.existedEmail);
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
