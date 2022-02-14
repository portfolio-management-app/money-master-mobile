import { useState } from 'react';
import { Validator } from 'utils/validator';

export const useCreateNewCategory = () => {
  const [assetName, setAssetName] = useState('');
  const [currentAsset, setCurrentAsset] = useState('0');
  const [interestRate, setInterestRate] = useState('0');
  const [interestValue, setInterestValue] = useState('0');
  const [interestType, setInterestType] = useState('Week');
  const [startDate, setStartDate] = useState(new Date());

  const submit = () => {
    if (
      Validator.validateStringEmpty(assetName) &&
      Validator.validateNumber(currentAsset) &&
      Validator.validateNumber(interestRate) &&
      Validator.validateNumber(interestValue)
    ) {
      console.log(
        assetName,
        currentAsset,
        interestRate,
        interestValue,
        interestType,
        startDate
      );
      return true;
    } else {
      return false;
    }
  };

  const cleanUp = () => {
    setAssetName('');
    setCurrentAsset('0');
    setStartDate(new Date());
    setInterestRate('0');
    setInterestValue('0');
    setInterestType('Week');
  };

  return {
    assetName,
    setAssetName,
    currentAsset,
    setCurrentAsset,
    interestRate,
    setInterestRate,
    interestValue,
    setInterestValue,
    interestType,
    setInterestType,
    setStartDate,
    submit,
    cleanUp,
  };
};
