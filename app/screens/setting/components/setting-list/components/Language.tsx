import { LocaleType } from 'i18n';
import RNRestart from 'react-native-restart';
import React from 'react';
import { LANG_KEY, localeKey, storage } from 'services/storage';
import { ConfirmModal, DialogPicker, Icon } from 'shared/components';
import { colorScheme, fontProvider } from 'shared/styles';
import { Common } from './Common';
import { ICON_SIZE, SCREEN_CONTENT } from '../../constant';

const langs = ['English', 'Vietnamese'];

type LangType = 'English' | 'Vietnamese';

export const Language = () => {
  const [openPicker, setOpenPicker] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [lang, setLang] = React.useState<LocaleType>(localeKey);

  const toggle = () => {
    setOpenPicker(!openPicker);
  };

  const handleChange = React.useCallback(
    (val: string) => {
      const res: LangType = val as LangType;
      setOpenPicker(false);
      switch (res) {
        case 'English':
          {
            if (lang !== 'en') {
              setLang('en');
              setOpenConfirm(true);
            }
          }
          break;
        case 'Vietnamese':
          {
            if (lang !== 'vn') {
              setLang('vn');
              setOpenConfirm(true);
            }
          }
          break;
      }
    },
    [lang]
  );

  const handleChangeLang = React.useCallback(
    (type: 'later' | 'now') => {
      storage.set(LANG_KEY, lang ? lang : 'en');
      if (type === 'now') {
        RNRestart.Restart();
      } else {
        setOpenConfirm(false);
      }
    },
    [lang]
  );
  return (
    <>
      <Common
        onPress={toggle}
        icon={
          <Icon.Material
            size={ICON_SIZE}
            color={colorScheme.black200}
            name="language"
          />
        }
        title={SCREEN_CONTENT.language}
      />
      <DialogPicker
        visible={openPicker}
        onDismiss={toggle}
        pickerProps={{
          values: langs,
          title: SCREEN_CONTENT.chooseLanguage,
          buttonStyle: {
            paddingTop: 20,
          },
          titleStyle: {
            type: 'h3',
          },
          labelStyle: {
            fontSize: 18,
            fontFamily: fontProvider.openSans,
          },
          initValue: lang === 'en' ? 'English' : 'Vietnamese',
          onChange: handleChange,
        }}
      />
      <ConfirmModal
        visible={openConfirm}
        onDismiss={() => setOpenConfirm(false)}
        title={SCREEN_CONTENT.reloadApp}
        cancelText={SCREEN_CONTENT.later}
        onCancelPress={() => handleChangeLang('later')}
        onConfirmPress={() => handleChangeLang('now')}
      />
    </>
  );
};
