export const log = (message: string, object: any) => {
  console.log(message, JSON.stringify(object, null, 2));
};
