import { observer } from 'mobx-react-lite';
import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer, TransparentLoading } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { MetalStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';
import { ActionBottomSheet, Filter } from './components';

const CONTENT = APP_CONTENT.marketCap;

export const MetalMarket = observer(() => {
  const [openSheet, setOpenSheet] = React.useState(false);
  const [type, setType] = React.useState('gold');
  const { information, getMetalData } = MetalStore;
  const { xauPrice, xagPrice, curr } = information.items[0];
  React.useEffect(() => {
    const interval = setInterval(() => {
      getMetalData(curr);
    }, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [curr, getMetalData]);

  const handleGoldLongPress = () => {
    setOpenSheet(!openSheet);
    setType('gold');
  };
  const handleSilverLongPress = () => {
    setOpenSheet(!openSheet);
    setType('silver');
  };
  return (
    <View style={styleProvider.relativeView}>
      <Filter onChange={(val) => getMetalData(val)} />
      <ActionBottomSheet
        type={type}
        show={openSheet}
        onClose={() => setOpenSheet(!openSheet)}
      />
      <TransparentLoading show={MetalStore.loading} />

      <TouchableOpacity
        onLongPress={handleGoldLongPress}
        style={styleProvider.card}
      >
        <View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.gold}: </TextContainer>
            <TextContainer color={colorScheme.blue200}>
              {formatCurrency(xauPrice, curr)}/spot
            </TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>
            <TextContainer>
              {parseToString(new Date(information.ts))}
            </TextContainer>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onLongPress={handleSilverLongPress}
        style={styleProvider.card}
      >
        <View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.silver}: </TextContainer>
            <TextContainer color={colorScheme.blue200}>
              {formatCurrency(xagPrice, curr)}/spot
            </TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>
            <TextContainer>
              {parseToString(new Date(information.ts))}
            </TextContainer>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});
