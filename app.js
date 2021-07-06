'use strict';

const url = "https://my-json-server.typicode.com/C-Rish/todolist";

const createRequest = function(url) {
  const httpRequest = new XMLHttpRequest(url);
  httpRequest.addEventListener('readystatechange', (url) => {
    if (httpRequest.readyState === 4) {
      console.log(httpRequest.responseText)
    }
  });
  httpRequest.open('GET', url);
  httpRequest.send();
};
createRequest(url);