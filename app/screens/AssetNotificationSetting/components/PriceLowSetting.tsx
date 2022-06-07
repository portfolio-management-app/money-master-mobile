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

export const PriceLowSetting = observer(({ setting, asset, type }: IProps) => {
  const [check, setCheck] = React.useState(setting.isLowOn);
  const [showModal, setShowModal] = React.useState(false);
  const [amount, setAmount] = React.useState(setting.highThreadHoldAmount);
  const { boundError, clearError, makeError } = useBounceError();
  React.useEffect(() => {
    setCheck(setting.isLowOn);
    setAmount(setting.lowThreadHoldAmount);
  }, [setting.isLowOn, setting.lowThreadHoldAmount]);
  const { registerPriceNotification, editSetting } = NotificationSettingStore;

  const { id, name, coinCode, currencyCode, currentPrice, stockCode } =
    getAssetCommonInfo(asset, type);

  const handleSubmit = (amount: number) => {
    if (amount > currentPrice) {
      makeError(CONTENT.error.low);
      return;
    }
    setAmount(amount);
    if (setting.id !== 0)
      editSetting({
        highThreadHoldAmount: setting.highThreadHoldAmount,
        lowThreadHoldAmount: amount,
        isHighOn: setting.isHighOn,
        isLowOn: setting.isLowOn,
      });
  };

  const handleChangeCheck = (val: boolean) => {
    if (val === true) {
      if (setting.id === 0) {
        if (currentPrice > amount) {
          makeError(CONTENT.error.low);
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
          isHigh: false,
        });
        return;
      }
      if (currentPrice > amount) {
        makeError(CONTENT.error.low);
        return;
      }
      editSetting({
        highThreadHoldAmount: setting.highThreadHoldAmount,
        lowThreadHoldAmount: setting.lowThreadHoldAmount,
        isHighOn: setting.isHighOn,
        isLowOn: true,
      });
      return;
    }
    editSetting({
      highThreadHoldAmount: setting.highThreadHoldAmount,
      lowThreadHoldAmount: setting.lowThreadHoldAmount,
      isHighOn: setting.isHighOn,
      isLowOn: false,
    });
  };

  return (
    <>
      <View style={{ paddingHorizontal: 30, marginTop: 30 }}>
        <View style={styleProvider.centerHorizontal}>
          <TextContainer style={{ flex: 1 }} ml={10}>
            {CONTENT.notificationAssetLowValue}
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
