import { similarListElement, similarPhotos } from './photos.js';
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onPictureClick (evt) {
  if(evt.target.matches('.picture__img')) {
    evt.preventDefault();
    openBigPicture();

    const bigPictureImg = document.querySelector('.big-picture__img');
    const bigPictureLikes = document.querySelector('.likes-count');
    const bigPictureCommentsCount = document.querySelector('.comments-count');
    const bigPictureDescription = document.querySelector('.social__caption');

    const commentTemplate = document.querySelector('.social__comment');
    const commentsList = document.querySelector('.social__comments');
    commentsList.innerHTML = '';

    similarPhotos.forEach((photo) => {
      if (photo.id.toString() === evt.target.closest('.picture').dataset.id) {

        photo.comments.forEach((comment) => {
          const commentElement = commentTemplate.cloneNode(true);

          commentElement.querySelector('.social__picture').src = comment.avatar;
          commentElement.querySelector('.social__picture').alt = comment.name;
          commentElement.querySelector('.social__text').textContent = comment.message;

          commentsList.append(commentElement);
        });

        bigPictureDescription.textContent = photo.description;
      }
    });

    const commentCount = document.querySelector('.social__comment-count');
    const commentLoader = document.querySelector('.comments-loader');

    commentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');

    bigPictureImg.querySelector('img').src = evt.target.src;
    bigPictureImg.querySelector('img').alt = evt.target.alt;
    bigPictureLikes.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

    bigPictureClose.addEventListener('click', closeBigPicture);
  }
}

similarListElement.addEventListener('click', onPictureClick);
