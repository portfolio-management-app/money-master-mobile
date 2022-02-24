export const toNumber = (str: string) => {
  str = str.replace(' ', '');
  const parsed = parseFloat(str);
  if (isNaN(parsed)) {
    return undefined;
  }

  return parsed;
};

export const yupParserNumber = (value: any, originalValue: any) => {
  if (originalValue === '') return undefined;
  originalValue = originalValue * 1;
  if (isNaN(originalValue)) {
    return undefined;
  }
  return originalValue;
};
