import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { Button, Input } from 'react-native-elements';
import { Loading, PlatformView, TextContainer } from 'components';
import { NavigationHeader } from 'navigation/header';
import { colorScheme, styleProvider } from 'styles';
import { LocaleStore } from 'stores/ui-store';
import { useAuthentication, useSocialLogin } from 'hooks/authen';
import { useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';

export const Login = () => {
  const [setEmail, setPassword, error, submit] = useAuthentication();

  const [loading, handleFaceBookLogin, handleGoogleLogin] = useSocialLogin();

  const navigation = useNavigation();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const onLogin = async () => {
    const res = await submit('login');
    navigation.navigate(screenName.home as never);
  };

  return (
    <PlatformView style={styleProvider.body}>
      <Loading show={loading} />
      <Observer>
        {() => {
          const { locale } = LocaleStore;
          return (
            <View style={styles.form}>
              <NavigationHeader title={locale.loginPage.header} />
              <View style={styles.inputContainer}>
                <Input
                  autoCompleteType={true}
                  placeholder={locale.loginPage.placeHolder.email}
                  leftIcon={{
                    type: 'material-community',
                    name: 'email',
                  }}
                  onChangeText={handleEmailChange}
                  errorMessage={error.emailMessage}
                />
                <Input
                  secureTextEntry={true}
                  autoCompleteType={true}
                  placeholder={locale.loginPage.placeHolder.password}
                  leftIcon={{
                    type: 'material-community',
                    name: 'onepassword',
                  }}
                  onChangeText={handlePasswordChange}
                  errorMessage={error.passwordMessage}
                />
              </View>
              <Button
                containerStyle={[styleProvider.button, styles.loginButton]}
                type="clear"
                onPress={onLogin}
                title={locale.greetingPage.login}
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
                  title={locale.loginPage.google}
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
                  title={locale.loginPage.facebook}
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
  loginButton: {
    borderColor: colorScheme.theme,
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
