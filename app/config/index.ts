export const GoogleClientID =
  '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com';

export const FacebookAppID = '283259500459094';

let url: string = 'https://grade-book-backend.herokuapp.com';

if (__DEV__) {
  url = 'https://a08f-123-22-24-194.ngrok.io';
}

export const COIN_API_URL = 'https://api.coingecko.com/api/v3';

export const BASE_URL = url;
