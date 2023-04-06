export const RERENDER_DELAY = 500;
export const COUNT_RANDOM_PHOTO = 10;
export const MAX_COUNT_COMMENTS_AT_PAGE = 5;
export const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
export const MAX_HASHTAGS_COUNT = 5;
export const MAX_COMMENT_LENGTH = 140;
export const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDIND: 'Публикация...'
};

export const Route = {
  GET_DATA: 'https://28.javascript.pages.academy/kekstagram/data',
  SEND_DATA: 'https://28.javascript.pages.academy/kekstagram'
};

export const Method = {
  GET: 'GET',
  POST: 'POST'
};

export const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

export const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

export const similarListElement = document.querySelector('.pictures');
export const bigPicture = document.querySelector('.big-picture');

export const uploadForm = document.querySelector('.img-upload__form');
export const uploadFile = uploadForm.querySelector('.img-upload__input');
export const hashtagsInput = uploadForm.querySelector('.text__hashtags');
export const commentInput = uploadForm.querySelector('.text__description');

export const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');

export const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
export const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
export const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
