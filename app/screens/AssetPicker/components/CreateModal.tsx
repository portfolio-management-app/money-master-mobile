import { Formik } from 'formik';
import React from 'react';
import { Modal, View } from 'react-native-ui-lib';
import { CreateModalHeader, CustomTextField } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { ModalProps } from 'shared/types';
import { AssetTypeStore } from '../store';
import { CreateAssetTypeSchema } from './validator';

const SCREEN_CONTENT = APP_CONTENT.createAssetType;

export const CreateModal = ({ show, onClose }: ModalProps) => {
  return (
    <Modal animationType="fade" visible={show} onRequestClose={onClose}>
      <Formik
        validationSchema={CreateAssetTypeSchema}
        initialValues={{ name: '' }}
        onSubmit={(values) => {
          AssetTypeStore.addNewAssetType(values.name);
          onClose();
        }}
      >
        {({ errors, touched, handleBlur, handleChange, handleSubmit }) => {
          return (
            <>
              <CreateModalHeader
                onClose={onClose}
                onCreate={handleSubmit}
                buttonLabel={SCREEN_CONTENT.create}
                title={SCREEN_CONTENT.header}
              />
              <View style={{ paddingHorizontal: 20 }}>
                <CustomTextField
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errorMessage={touched.name ? errors.name : ''}
                  placeholder={SCREEN_CONTENT.name}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};
