import { imageSource } from 'assets/images';
import {
  CreateAssetModal,
  FloatingButton,
  FocusAwareStatusBar,
  Loading,
  PlatformView,
  TextContainer,
  TextField,
} from 'shared/components';
import { i18n } from 'i18n';
import { Observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import { RefreshControl, View } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { LocaleStore } from 'shared/stores';
import { colorScheme, iconProvider, styleProvider } from 'shared/styles';
import { Formik } from 'formik';
import { validateSchema } from './validator';
import { CategoryStore } from './store';

export const InterestAssets = () => {
  const [showSheet, setShowSheet] = React.useState(false);

  const navigation = useNavigation();

  const toggle = () => {
    setShowSheet(!showSheet);
  };

  const gotoAssetCategoryScreen = (name: string, id: number) => {
    switch (name) {
      case 'Bank':
        {
          navigation.navigate(screenName.bank as never);
        }
        break;
      default:
        {
          navigation.navigate(
            screenName.customCategory as never,
            { id: id, name: name } as never
          );
        }
        break;
    }
  };

  React.useEffect(() => {
    CategoryStore.getCategoryList();
  }, []);

  return (
    <PlatformView style={styleProvider.bgBody}>
      <FocusAwareStatusBar backgroundColor={colorScheme.white} />

      <Observer>
        {() => {
          const { currentLocale } = LocaleStore;

          const { categoryList, loading, createCategory, getCategoryList } =
            CategoryStore;

          const modalContent = i18n[currentLocale].interestAssets.addModel;

          const defaultAssets = [
            {
              title: i18n[currentLocale].interestAssets.bank,
              icon: imageSource.bank,
            },
          ];

          return (
            <>
              <NavigationHeader
                title={i18n[currentLocale].portfolioCategory.interest}
              />

              <ScrollView
                refreshControl={
                  <RefreshControl
                    onRefresh={() => getCategoryList()}
                    refreshing={loading}
                  />
                }
              >
                <View style={styleProvider.assetCardContainer}>
                  {/* {defaultAssets.map((asset, idx) => (
                    <ListItem.Swipeable
                      bottomDivider
                      key={asset.title}
                      leftContent={
                        <Button
                          title="Info"
                          icon={{ name: 'info', color: 'white' }}
                          buttonStyle={{ minHeight: '100%' }}
                        />
                      }
                    >
                      <ListItem.Content key={idx}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Image
                            style={styleProvider.assetImage}
                            source={asset.icon}
                          />
                          <View style={styleProvider.assetTextContainer}>
                            <TextContainer
                              type="h4"
                              style={{ fontWeight: 'bold' }}
                            >
                              {asset.title}
                            </TextContainer>
                            <TextContainer type="small">
                              {asset.title}
                            </TextContainer>
                          </View>
                        </View>
                      </ListItem.Content>
                    </ListItem.Swipeable>
                  ))} */}

                  {categoryList.map((category) => (
                    <ListItem.Swipeable
                      onPress={() =>
                        gotoAssetCategoryScreen(category.name, category.id)
                      }
                      style={{ marginBottom: 5 }}
                      bottomDivider
                      key={category.id}
                      rightContent={
                        <Button
                          title="Delete"
                          icon={{ name: 'delete', color: 'white' }}
                          buttonStyle={{
                            backgroundColor: 'red',
                            minHeight: '90%',
                          }}
                        />
                      }
                    >
                      <ListItem.Content>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Icon
                            name="wallet"
                            type={iconProvider.fontisto}
                            color={colorScheme.theme}
                            size={30}
                            tvParallaxProperties={{}}
                          />
                          <View style={styleProvider.assetTextContainer}>
                            <TextContainer
                              type="h4"
                              style={{ fontWeight: 'bold' }}
                            >
                              {category.name}
                            </TextContainer>
                            <TextContainer type="small">
                              {category.name}
                            </TextContainer>
                          </View>
                        </View>
                      </ListItem.Content>
                      <ListItem.Chevron tvParallaxProperties={{}} />
                    </ListItem.Swipeable>
                  ))}
                </View>
              </ScrollView>
              <Formik
                initialValues={{
                  categoryName: '',
                }}
                validationSchema={validateSchema}
                validateOnMount={true}
                isInitialValid={false}
                onSubmit={(values, { resetForm }) => {
                  toggle();
                  createCategory(values.categoryName);
                  resetForm();
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  errors,
                  handleBlur,
                  touched,
                  isValid,
                  resetForm,
                }) => {
                  return (
                    <CreateAssetModal
                      disableCreate={!isValid}
                      modalLabel={modalContent.categoryHeader}
                      confirmText={modalContent.add}
                      cancelText={modalContent.cancel}
                      renderInputs={() => (
                        <>
                          <TextField
                            onChangeText={handleChange('categoryName')}
                            onBlur={handleBlur('categoryName')}
                            errorMessage={
                              touched.categoryName ? errors.categoryName : ''
                            }
                            placeholder={modalContent.category}
                          ></TextField>
                        </>
                      )}
                      show={showSheet}
                      onClose={() => {
                        resetForm();
                        toggle();
                      }}
                      onCreate={handleSubmit}
                    />
                  );
                }}
              </Formik>
              <FloatingButton size={60} onPress={toggle}>
                <Icon
                  tvParallaxProperties={{}}
                  name="add"
                  size={30}
                  type={iconProvider.ionicon}
                  color={colorScheme.white}
                />
              </FloatingButton>
            </>
          );
        }}
      </Observer>
    </PlatformView>
  );
};
