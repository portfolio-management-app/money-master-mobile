import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { RadioButton, RadioGroup } from 'react-native-ui-lib';
import { LocaleStore } from 'shared/stores';

export const LanguageSetting = observer(() => {
  const value = React.useMemo(() => {
    return ['Vietnamese', 'English'];
  }, []);
  const [defaultValue, setDefaultValue] = React.useState('English');

  useEffect(() => {
    if (LocaleStore.currentLocale === 'en') {
      setDefaultValue('English');
    } else {
      setDefaultValue('Vietnamese');
    }
  }, [LocaleStore.currentLocale]);

  const handleChange = (value: 'Vietnamese' | 'English') => {
    if (value === 'English') {
      LocaleStore.changeLocale('en');
    } else {
      LocaleStore.changeLocale('vn');
    }
  };
  return (
    <RadioGroup onValueChange={handleChange} initialValue={defaultValue}>
      {value.map((e) => (
        <RadioButton key={e} value={e} label={e} />
      ))}
    </RadioGroup>
  );
});
