import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Icon } from 'react-native-elements';
import {
  colorScheme,
  dimensionProvider,
  fontProvider,
  iconProvider,
} from 'shared/styles';
import {
  BaseButton,
  DatePicker,
  RadioPicker,
  TextContainer,
} from 'shared/components';

interface IProps {
  hasDatePicker?: boolean;
  hasRadioGroup?: boolean;
  createOnHeader?: boolean;
  radioValue?: Array<string>;
  radioLabel?: string;
  modalLabel: string;
  datePickerLabel?: string;
  datePickerMinDate?: Date;
  datePickerMaxDate?: Date;
  disableCreate?: boolean;
  onRadioChange?: (value: string) => void;
  onDateChange?: (date: Date) => void;
  renderInputs: () => JSX.Element;
  show: boolean;
  confirmText: string;
  cancelText: string;
  onClose: () => void;
  onCreate: () => void;
}
export class CreateAssetModal extends React.Component<IProps> {
  onDatePickerChange(date: Date) {
    const { onDateChange } = this.props;
    if (onDateChange) {
      console.log();
      onDateChange(date);
    }
  }

  onRadioPickerChange(value: string) {
    const { onRadioChange } = this.props;
    if (onRadioChange) {
      onRadioChange(value);
    }
  }

  renderDatePicker() {
    const {
      hasDatePicker,
      datePickerLabel = '',
      datePickerMaxDate,
      datePickerMinDate,
    } = this.props;
    if (hasDatePicker === true)
      return (
        <DatePicker
          label={datePickerLabel}
          maxDate={datePickerMaxDate}
          minDate={datePickerMinDate}
          onChange={(date: Date) => this.onDatePickerChange(date)}
        />
      );
    else return <></>;
  }

  renderRadioGroup() {
    const { hasRadioGroup, radioLabel = '', radioValue = [] } = this.props;
    if (hasRadioGroup === true)
      return (
        <RadioPicker
          onChange={(value: string) => this.onRadioPickerChange(value)}
          title={radioLabel}
          values={radioValue}
        />
      );
    else return <></>;
  }

  render() {
    return (
      <BottomSheet
        containerStyle={{ backgroundColor: colorScheme.loading }}
        isVisible={this.props.show}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Icon
              onPress={() => this.props.onClose()}
              name="close"
              size={30}
              type={iconProvider.ionicon}
              tvParallaxProperties={{}}
            />
            <TextContainer style={styles.header}>
              {this.props.modalLabel}
            </TextContainer>
            <TouchableOpacity onPress={() => this.props.onCreate()}>
              <TextContainer style={{ color: colorScheme.theme }}>
                {this.props.confirmText}
              </TextContainer>
            </TouchableOpacity>
          </View>

          {this.props.renderInputs()}
          {this.renderRadioGroup()}
          {this.renderDatePicker()}
        </View>
      </BottomSheet>
    );
  }
}

const styles = StyleSheet.create({
  addNewButton: {
    borderRadius: 20,
    backgroundColor: colorScheme.theme,
    marginRight: 20,
    paddingHorizontal: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    borderRadius: 20,
    backgroundColor: colorScheme.red500,
    paddingHorizontal: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: colorScheme.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'bold',
  },
});
