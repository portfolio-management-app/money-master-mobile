export const delay = (time: number) => {
  return new Promise((rs, rj) => {
    setTimeout(() => {
      rs(1);
    }, time);
  });
};
