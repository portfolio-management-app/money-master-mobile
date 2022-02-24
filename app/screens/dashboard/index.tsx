import React from 'react';
import { Button } from 'react-native-ui-lib';
import { CustomToast, Loading, PlatformView } from 'shared/components';
import { styleProvider } from 'shared/styles';

export const DashBoard = () => {
  const [show, setShow] = React.useState(false);
  return (
    <PlatformView style={styleProvider.body}>
      <Loading show={false} />
      <CustomToast
        variant="error"
        show={show}
        onDismiss={() => setShow(!show)}
        message={'Error credential'}
      />
      <Button onPress={() => setShow(!show)} label="Show toast" />
    </PlatformView>
  );
};
