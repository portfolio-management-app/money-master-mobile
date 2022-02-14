export const delay = (time: number) => {
  return new Promise((rs) => {
    setTimeout(() => {
      rs(1);
    }, time);
  });
};
