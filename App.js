/* eslint-disable no-undef */
import { NavigationStack } from 'navigation/stack';
import React from 'react';

const App = () => {
  return <NavigationStack />;
};
// eslint-disable-next-line no-global-assign, no-undef
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

export default App;
