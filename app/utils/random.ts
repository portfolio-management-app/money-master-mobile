export const randomPieChartColor = (): string => {
  return (
    'rgb(' +
    Math.floor(Math.random() * (235 - 52 + 1) + 52) +
    ',' +
    Math.floor(Math.random() * (235 - 52 + 1) + 52) +
    ',' +
    Math.floor(Math.random() * (235 - 52 + 1) + 52) +
    ')'
  );
};
