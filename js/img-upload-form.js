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

pristine.addValidator(hashtagsInput, validateHashtagsFormat, 'Неверный формат хэш-тегов');
pristine.addValidator(hashtagsInput, validateHashtagsLength, 'Количество хэш-тегов превышает 5');
pristine.addValidator(hashtagsInput, validateHashtagsIdentity, 'Один и тот же хэш-тег не может быть использован дважды');
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
  uploadForm.reset();
  pristine.reset();
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

function validateHashtagsFormat (hashtags) {
  const hashtagsArray = hashtags.trim().split(' ');
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
  let flag = true;
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

function validateHashtagsLength (hashtags) {
  const hashtagsArray = hashtags.trim().split(' ');
  return hashtagsArray.length <= 5;
}

function validateHashtagsIdentity (hashtags) {
  const hashtagsArray = hashtags.trim().split(' ');
  const set = new Set(hashtagsArray);
  let flag = true;
  if(set.size !== hashtagsArray.length) {
    flag = false;
  }
  return flag;
}

function validateComment (comment) {
  return comment.length <= 140;
}
