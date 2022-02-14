import { i18n } from 'i18n';
import React from 'react';
import { ErrorDialog } from 'shared/components';
import { LocaleStore } from 'shared/stores';
import { ErrorBounderProps } from 'shared/types';

export const ErrorBounder = ({ show, res, onClose }: ErrorBounderProps) => {
  const [message, setMessage] = React.useState('');
  const content = i18n[LocaleStore.currentLocale].authenError.register;

  React.useEffect(() => {
    if (res !== null) {
      switch (res.code) {
        case 400:
          setMessage(content.existedEmail);
      }
    }
  }, [res]);

  return (
    <ErrorDialog show={show} message={message} onClose={() => onClose()} />
  );
};
