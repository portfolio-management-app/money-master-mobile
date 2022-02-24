import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { RadioButton, RadioGroup } from 'react-native-ui-lib';
import { i18Key, LANG_KEY, storage } from 'services/storage';

export const LanguageSetting = observer(() => {
  const value = React.useMemo(() => {
    return ['Vietnamese', 'English'];
  }, []);
  const [defaultValue, setDefaultValue] = React.useState('English');

  useEffect(() => {
    if (i18Key === 'en') {
      setDefaultValue('English');
    } else {
      setDefaultValue('Vietnamese');
    }
  }, []);

  const handleChange = (value: 'Vietnamese' | 'English') => {
    if (value === 'English') {
      storage.set(LANG_KEY, 'en');
    } else {
      storage.set(LANG_KEY, 'vn');
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
