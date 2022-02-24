import { i18n } from 'i18n';
import React from 'react';
import { i18Key } from 'services/storage';
import { ErrorDialog } from 'shared/components';
import { ErrorBounderProps } from 'shared/types';

const ErrorLocale = i18n[i18Key].authenError.register;

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
    <ErrorDialog show={show} message={message} onClose={() => onClose()} />
  );
};
