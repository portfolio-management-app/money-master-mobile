const production = {
  GoogleClientID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  FacebookAppID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  BASE_URL: 'https://grade-book-backend.herokuapp.com',
  COIN_API_URL: 'https://api.coingecko.com/api/v3',
  STOCK_API_URL: 'https://finnhub.io/api/v1',
  STOCK_API_KEY: 'c91frk2ad3if9n5lf930',
  CURRENCY_API_KEY: 'pWbCofcpQ0yfczEn0m1Sbp',
  CURRENCY_API_URL: 'https://fcsapi.com/api-v3/forex',
  METAL_API_KEY: 'goldapi-ejlu18l0q4qaka-io',
};

const dev = {
  GoogleClientID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  FacebookAppID:
    '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com',
  BASE_URL: 'https://32f1-14-240-147-73.ngrok.io',
  COIN_API_URL: 'https://api.coingecko.com/api/v3',
  STOCK_API_URL: 'https://finnhub.io/api/v1',
  STOCK_API_KEY: 'c8h21oiad3i9rgv9d1f0',
  CURRENCY_API_KEY: '6UHQaENkGtQ2OZKTBIz8TAYT',
  CURRENCY_API_URL: 'https://fcsapi.com/api-v3/forex',
  METAL_API_KEY: 'goldapi-ejlu18l0q4qaka-io',
};

let temp = production;

if (__DEV__) {
  temp = dev;
}

export const Config = temp;
