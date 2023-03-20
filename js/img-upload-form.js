import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const closeUploadForm = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
export const uploadFormLabel = document.querySelector('.img-upload__label');
export const uploadFile = document.querySelector('.img-upload__input');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(hashtagsInput, validateHashtags, 'Неверный формат хэш-тегов или количество хэш-тегов превышает 5');
pristine.addValidator(commentInput, validateComment, 'Максимальная длина 140 символов');

const onFormKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

function cancelCloseForm (evt) {
  evt.target.addEventListener('keydown', (e) => {
    e.stopPropagation();
  });
}

function validateForm (evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

function closeForm () {
  uploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  hashtagsInput.removeEventListener('focus', cancelCloseForm);
  commentInput.removeEventListener('focus', cancelCloseForm);
  uploadForm.removeEventListener('submit', validateForm);
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', onFormKeydown);
}

export function openUploadForm () {
  document.body.addEventListener('keydown', onFormKeydown);
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  closeUploadForm.addEventListener('click', closeForm);
  hashtagsInput.addEventListener('focus', cancelCloseForm);
  commentInput.addEventListener('focus', cancelCloseForm);
  uploadForm.addEventListener('submit', validateForm);
}

function validateHashtags (hashtags) {
  const hashtagsArray = hashtags.split(' ');
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
  let flag = true;
  if ((hashtagsArray.length > 5) || (new Set(hashtagsArray).size !== hashtagsArray.length)) {
    flag = false;
  }
  hashtagsArray.forEach((hashtag) => {
    if (!regexp.test(hashtag)) {
      flag = false;
    }
  });
  if (hashtagsArray.length === 1 && hashtagsArray[0] === '') {
    flag = true;
  }
  return flag;
}

function validateComment (comment) {
  return comment.length <= 140;
}
