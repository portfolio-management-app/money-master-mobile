import { useState } from 'react';

export const useCreateNewAsset = () => {
  const [assetName, setAssetName] = useState('');
  const [currentAsset, setCurrentAsset] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  return {
    assetName,
    setAssetName,
    currentAsset,
    setCurrentAsset,
    startDate,
    setStartDate,
  };
};
