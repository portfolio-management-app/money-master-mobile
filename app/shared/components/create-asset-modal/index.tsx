import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import { colorScheme, fontProvider } from 'shared/styles';
import {
  BaseButton,
  DatePicker,
  RadioPicker,
  TextContainer,
} from 'shared/components';

interface IProps {
  hasDatePicker?: boolean;
  hasRadioGroup?: boolean;
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
          <TextContainer style={styles.header}>
            {this.props.modalLabel}
          </TextContainer>
          {this.props.renderInputs()}
          {this.renderRadioGroup()}
          {this.renderDatePicker()}
          <View style={styles.buttonContainer}>
            <BaseButton
              disabled={this.props.disableCreate}
              textDisabled={this.props.disableCreate}
              style={styles.addNewButton}
              onPress={() => this.props.onCreate()}
              label={this.props.confirmText}
            />
            <BaseButton
              labelStyle={{ fontFamily: fontProvider.openSans }}
              style={styles.cancelButton}
              onPress={() => this.props.onClose()}
              label={this.props.cancelText}
            />
          </View>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'bold',
  },
});
