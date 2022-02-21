export const GoogleClientID =
  '511417762868-an9ak0crrtra3c4l0rqebt5bmuuo5aqp.apps.googleusercontent.com';

export const FacebookAppID = '283259500459094';

let url: string = '';

if (__DEV__) {
  url = 'http://localhost:5000';
}

export const BASE_URL = url;
