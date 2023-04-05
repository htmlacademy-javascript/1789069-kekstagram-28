import { uploadForm, hashtagsInput, commentInput, HASHTAG_REGEXP, MAX_HASHTAGS_COUNT, MAX_COMMENT_LENGTH } from './constants.js';

export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateHashtagsFormat = (hashtags) => {
  const hashtagsArray = hashtags.trim().split(' ').filter((hashtag) => hashtag.trim());
  let flag = true;
  hashtagsArray.forEach((hashtag) => {
    if (!HASHTAG_REGEXP.test(hashtag)) {
      flag = false;
    }
  });
  if (hashtagsArray.length === 1 && hashtagsArray[0] === '') {
    flag = true;
  }
  return flag;
};

const validateHashtagsLength = (hashtags) => {
  const hashtagsArray = hashtags.trim().split(' ').filter((hashtag) => hashtag.trim());
  return hashtagsArray.length <= MAX_HASHTAGS_COUNT;
};

const validateHashtagsDuplicate = (hashtags) => {
  const hashtagsArray = hashtags.trim().split(' ').filter((hashtag) => hashtag.trim());
  const set = new Set(hashtagsArray);
  let flag = true;
  if(set.size !== hashtagsArray.length) {
    flag = false;
  }
  return flag;
};

const validateComment = (comment) => comment.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagsInput, validateHashtagsFormat, 'Неверный формат хэш-тегов');
pristine.addValidator(hashtagsInput, validateHashtagsLength, `Количество хэш-тегов превышает ${MAX_HASHTAGS_COUNT}`);
pristine.addValidator(hashtagsInput, validateHashtagsDuplicate, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(commentInput, validateComment, `Максимальная длина - ${MAX_COMMENT_LENGTH} символов`);

