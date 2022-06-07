import { observer } from 'mobx-react-lite';
import React from 'react';
import { Switch, View } from 'react-native-ui-lib';
import { CustomToast, Icon, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { INotificationSetting } from 'shared/models';
import { NotificationSettingStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { ApiAssetType, CombinationAsset } from 'shared/types';
import { getAssetCommonInfo } from '../helper';
import { useBounceError } from '../hook';
import { NotiPriceInfo } from './NotiPriceInfo';
import { PriceHighInputModal } from './PriceHighInputModal';

const CONTENT = APP_CONTENT.assetNotificationSetting;

interface IProps {
  setting: INotificationSetting;
  asset: CombinationAsset;
  type: ApiAssetType;
}

export const PriceHighSetting = observer(({ setting, asset, type }: IProps) => {
  const [check, setCheck] = React.useState(setting.isHighOn);
  const [showModal, setShowModal] = React.useState(false);
  const [amount, setAmount] = React.useState(setting.highThreadHoldAmount);
  const { boundError, clearError, makeError } = useBounceError();
  React.useEffect(() => {
    setCheck(setting.isHighOn);
    setAmount(setting.highThreadHoldAmount);
  }, [setting.isHighOn, setting.highThreadHoldAmount]);
  const { registerPriceNotification, editSetting } = NotificationSettingStore;

  const { id, name, coinCode, currencyCode, currentPrice, stockCode } =
    getAssetCommonInfo(asset, type);

  const handleSubmit = (amount: number) => {
    if (amount < currentPrice) {
      makeError(CONTENT.error.high);
      return;
    }
    setAmount(amount);
    if (setting.id !== 0)
      editSetting({
        highThreadHoldAmount: amount,
        lowThreadHoldAmount: setting.lowThreadHoldAmount,
        isHighOn: setting.isHighOn,
        isLowOn: setting.isLowOn,
      });
  };

  const handleChangeCheck = (val: boolean) => {
    if (val === true) {
      if (setting.id === 0) {
        if (currentPrice > amount) {
          makeError(CONTENT.error.high);
          return;
        }
        registerPriceNotification({
          assetId: id,
          assetName: name,
          assetType: type,
          coinCode: coinCode,
          stockCode: stockCode,
          currency: currencyCode,
          highThreadHoldAmount: amount,
          lowThreadHoldAmount: setting.lowThreadHoldAmount,
          isHigh: true,
        });
        return;
      }
      if (currentPrice > amount) {
        makeError(CONTENT.error.high);
        return;
      }
      editSetting({
        highThreadHoldAmount: setting.highThreadHoldAmount,
        lowThreadHoldAmount: setting.lowThreadHoldAmount,
        isHighOn: true,
        isLowOn: setting.isLowOn,
      });
      return;
    }
    editSetting({
      highThreadHoldAmount: setting.highThreadHoldAmount,
      lowThreadHoldAmount: setting.lowThreadHoldAmount,
      isHighOn: false,
      isLowOn: setting.isLowOn,
    });
  };

  return (
    <>
      <View style={{ paddingHorizontal: 30 }}>
        <View style={styleProvider.centerHorizontal}>
          <TextContainer style={{ flex: 1 }} ml={10}>
            {CONTENT.notificationAssetHighValue}
          </TextContainer>
          <Switch
            onColor={colorScheme.theme}
            value={check}
            onValueChange={handleChangeCheck}
          />
        </View>

        <View
          style={[
            styleProvider.centerHorizontal,
            { marginTop: 10, marginLeft: 10 },
          ]}
        >
          <NotiPriceInfo amount={amount} currency={setting.currency} />
          <Icon.MaterialCommunity
            name="briefcase-edit"
            color={colorScheme.black200}
            size={25}
            style={{ marginLeft: 20 }}
            onPress={() => setShowModal(!showModal)}
          />
        </View>
        <PriceHighInputModal
          show={showModal}
          initAmount={amount}
          onClose={() => setShowModal(!showModal)}
          onSubmit={handleSubmit}
        />
      </View>
      <CustomToast
        message={boundError.message}
        variant="error"
        show={boundError.isError}
        onDismiss={clearError}
      />
    </>
  );
});
