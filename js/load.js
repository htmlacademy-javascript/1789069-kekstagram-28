import { Route, Method, ErrorText } from './constants.js';

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${route}`, {method, body})
    .then((responce) => {
      if (!responce.ok) {
        throw new Error();
      }
      return responce.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

export const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);
