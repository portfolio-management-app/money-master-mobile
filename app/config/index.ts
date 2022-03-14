const production = {
  GoogleClientID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  FacebookAppID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  BASE_URL: 'https://grade-book-backend.herokuapp.com',
  COIN_API_URL: 'https://api.coingecko.com/api/v3',
  STOCK_API_URL: 'https://api.twelvedata.com',
  STOCK_API_KEY: '3bc55b4319ea4709a7660a022cf6bcc4',
};

const dev = {
  GoogleClientID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  FacebookAppID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  BASE_URL: 'https://d671-123-22-24-194.ngrok.io',
  COIN_API_URL: 'https://api.coingecko.com/api/v3',
  STOCK_API_URL: 'https://api.twelvedata.com',
  STOCK_API_KEY: '3bc55b4319ea4709a7660a022cf6bcc4',
};

let temp = production;

if (__DEV__) {
  temp = dev;
}

export const Config = temp;
