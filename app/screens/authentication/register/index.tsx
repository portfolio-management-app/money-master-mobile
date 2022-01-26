import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { Button, Input } from 'react-native-elements';
import { Loading, PlatformView, TextContainer } from 'components';
import { NavigationHeader } from 'navigation/header';
import { colorScheme, styleProvider } from 'styles';
import { LocaleStore } from 'stores/ui-store';
import { useAuthentication, useSocialLogin } from 'hooks/authen';

export const Register = () => {
  const [setEmail, setPassword, error, submit] = useAuthentication();

  const [loading, handleFaceBookLogin, handleGoogleLogin] = useSocialLogin();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const onRegister = async () => {
    const res = await submit('register');
  };

  return (
    <PlatformView style={styleProvider.body}>
      <Loading show={loading} />
      <Observer>
        {() => {
          const { locale } = LocaleStore;
          return (
            <View style={styles.form}>
              <NavigationHeader title={locale.registerPage.header} />
              <View style={styles.inputContainer}>
                <Input
                  onChangeText={handleEmailChange}
                  autoCompleteType={true}
                  placeholder={locale.registerPage.placeHolder.email}
                  leftIcon={{
                    type: 'material-community',
                    name: 'email',
                  }}
                  errorMessage={error.emailMessage}
                />
                <Input
                  onChangeText={handlePasswordChange}
                  secureTextEntry={true}
                  autoCompleteType={true}
                  placeholder={locale.registerPage.placeHolder.password}
                  leftIcon={{
                    type: 'material-community',
                    name: 'onepassword',
                  }}
                  errorMessage={error.passwordMessage}
                />
              </View>
              <Button
                containerStyle={[styleProvider.button, styles.registerButton]}
                type="solid"
                onPress={onRegister}
                title={locale.greetingPage.register}
              ></Button>
              <View style={styles.textContainer}>
                <TextContainer style={{ color: colorScheme.theme }}>
                  OR
                </TextContainer>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  type="clear"
                  icon={{
                    type: 'antdesign',
                    name: 'googleplus',
                    color: colorScheme.white,
                  }}
                  onPress={handleGoogleLogin}
                  containerStyle={[styleProvider.button, styles.googleButton]}
                  title={locale.registerPage.google}
                  titleStyle={{ color: colorScheme.white }}
                ></Button>
                <Button
                  onPress={handleFaceBookLogin}
                  type="clear"
                  icon={{
                    type: 'fontawesome',
                    name: 'facebook',
                    color: colorScheme.white,
                  }}
                  containerStyle={[styleProvider.button, styles.facebookButton]}
                  title={locale.registerPage.facebook}
                  titleStyle={{ color: colorScheme.white }}
                ></Button>
              </View>
            </View>
          );
        }}
      </Observer>
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
  },
  registerButton: {
    borderColor: colorScheme.theme,
    backgroundColor: colorScheme.theme,
    marginTop: 20,
  },
  googleButton: {
    borderColor: colorScheme.red500,
    backgroundColor: colorScheme.red500,
  },

  facebookButton: {
    borderColor: colorScheme.blue300,
    backgroundColor: colorScheme.blue300,
    marginTop: 30,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
