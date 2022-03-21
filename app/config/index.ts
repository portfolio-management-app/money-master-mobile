const production = {
  GoogleClientID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  FacebookAppID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  BASE_URL: 'https://grade-book-backend.herokuapp.com',
  COIN_API_URL: 'https://api.coingecko.com/api/v3',
  STOCK_API_URL: 'https://finnhub.io/api/v1',
  STOCK_API_KEY: '3bc55b4319ea4709a7660a022cf6bcc4',
  TWELVEDATA_URL: 'https://api.twelvedata.com',
  TWELVEDATA_API_KEY: '67d9c7d05deb4bda882af961e6f1ca57',
  CURRENCY_API_KEY: '6e444db0b87845888c535eab08d1ea9e',
  CURRENCY_API_URL: 'https://openexchangerates.org/api',
  METAL_API_KEY: 'goldapi-ejlu18l0q4qaka-io',
};

const dev = {
  GoogleClientID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  FacebookAppID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  BASE_URL: 'https://9080-14-242-81-51.ngrok.io',
  COIN_API_URL: 'https://api.coingecko.com/api/v3',
  STOCK_API_URL: 'https://finnhub.io/api/v1',
  STOCK_API_KEY: 'c8h21oiad3i9rgv9d1f0',
  TWELVEDATA_URL: 'https://api.twelvedata.com',
  TWELVEDATA_API_KEY: '3bc55b4319ea4709a7660a022cf6bcc4',
  CURRENCY_API_KEY: '22ad5ee19f04411cab95abfa71152c28',
  CURRENCY_API_URL: 'https://openexchangerates.org/api',
  METAL_API_KEY: 'goldapi-ejlu18l0q4qaka-io',
};

let temp = production;

if (__DEV__) {
  temp = dev;
}

export const Config = temp;
