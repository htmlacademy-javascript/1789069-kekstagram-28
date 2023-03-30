const Route = {
  GET_DATA: 'https://28.javascript.pages.academy/kekstagram/data',
  SEND_DATA: 'https://28.javascript.pages.academy/kekstagram'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

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
