import { NavigationHeader } from 'navigation/header';
import React from 'react';
import {
  CustomToast,
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { AccountStore } from 'shared/stores';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import { localeKey } from 'services/storage';
import { APP_CONTENT } from 'shared/constants';
import { TouchableOpacity, View } from 'react-native-ui-lib';

const CONTENT = APP_CONTENT.resetPassword;

export const OTPVerify = observer(() => {
  const routeProps = useRoute<RootStackScreenProps<'OTPVerify'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();

  const { requestForgetPasswordAgain, verifyOtp, response } = AccountStore;

  const handleVerifyOtp = async (code: string) => {
    const result = await verifyOtp({
      email: routeProps.params.email,
      otpCode: code,
    });
    if (result) {
      navigation.navigate('ResetPassword', { email: routeProps.params.email });
    }
  };

  const requestAgain = () => {
    requestForgetPasswordAgain({
      email: routeProps.params.email,
      lang: localeKey,
    });
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.otpHeader} />
      <View
        style={[
          styleProvider.centerVertical,
          { paddingHorizontal: 20, marginTop: 20 },
        ]}
      >
        <TextContainer>
          {CONTENT.noti}
          {': '}
          <TextContainer color={colorScheme.theme}>
            {routeProps.params.email}
          </TextContainer>
          {'. '}
          {CONTENT.pleaseCheck}
        </TextContainer>
      </View>

      <OTPInputView
        style={{ height: 150, paddingHorizontal: 20 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={handleVerifyOtp}
      />
      <View style={styleProvider.centerVertical}>
        <TextContainer>{CONTENT.notReceiveCode}</TextContainer>
        <TouchableOpacity onPress={requestAgain}>
          <TextContainer color={colorScheme.theme}>
            {CONTENT.resend}
          </TextContainer>
        </TouchableOpacity>
      </View>

      <CustomToast
        variant="error"
        show={response.isError}
        message={response.errorMessage}
        onDismiss={response.deleteError}
      />

      <CustomToast
        show={response.isSuccess}
        message={CONTENT.resendSuccess}
        onDismiss={response.deleteSuccess}
      />
      <TransparentLoading show={response.pending} />
    </PlatformView>
  );
});

const styles = StyleSheet.create({
  borderStyleHighLighted: {
    borderColor: colorScheme.theme,
  },

  underlineStyleBase: {
    color: colorScheme.black200,
  },

  underlineStyleHighLighted: {
    borderColor: colorScheme.theme,
  },
});
