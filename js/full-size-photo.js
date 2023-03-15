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

    const commentCount = document.querySelector('.social__comment-count');
    const commentLoader = document.querySelector('.comments-loader');

    let maxCountComments = 5;
    let currentCountComments = 0;

    bigPictureImg.querySelector('img').src = evt.target.src;
    bigPictureImg.querySelector('img').alt = evt.target.alt;
    bigPictureLikes.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

    const commentTemplate = document.querySelector('.social__comment');
    const commentsList = document.querySelector('.social__comments');
    commentsList.innerHTML = '';

    similarPhotos.forEach((photo) => {
      if (photo.id.toString() === evt.target.closest('.picture').dataset.id) {

        const comments = [];

        for (let i = 0; i < photo.comments.length; i++) {
          const commentElement = commentTemplate.cloneNode(true);

          commentElement.querySelector('.social__picture').src = photo.comments[i].avatar;
          commentElement.querySelector('.social__picture').alt = photo.comments[i].name;
          commentElement.querySelector('.social__text').textContent = photo.comments[i].message;

          if (currentCountComments >= maxCountComments) {
            commentElement.classList.add('hidden');
          }

          commentsList.append(commentElement);
          if (currentCountComments < maxCountComments) {
            currentCountComments++;
          }

          comments.push(commentElement);
        }

        commentLoader.addEventListener('click', () => {
          if (maxCountComments + 5 <= comments.length) {
            maxCountComments += 5;
          } else if (maxCountComments + 4 <= comments.length) {
            maxCountComments += 4;
          } else if (maxCountComments + 3 <= comments.length) {
            maxCountComments += 3;
          } else if (maxCountComments + 2 <= comments.length) {
            maxCountComments += 2;
          } else if (maxCountComments + 1 <= comments.length) {
            maxCountComments += 1;
          }

          commentCount.innerHTML = `${maxCountComments} из <span class="comments-count">${bigPictureCommentsCount.textContent}</span> комментариев`;

          for (let i = currentCountComments; i < maxCountComments; i++) {
            comments[i].classList.remove('hidden');
          }

          currentCountComments += 5;
        });

        bigPictureDescription.textContent = photo.description;
      }
    });

    bigPictureClose.addEventListener('click', closeBigPicture);
  }
}

similarListElement.addEventListener('click', onPictureClick);
