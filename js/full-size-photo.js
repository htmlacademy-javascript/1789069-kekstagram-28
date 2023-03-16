import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

export function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

export function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export function setBigPictureData (dataPhoto) {

  const bigPictureImg = bigPicture.querySelector('.big-picture__img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  const commentCount = bigPicture.querySelector('.social__comment-count');
  const commentLoader = bigPicture.querySelector('.comments-loader');

  let maxCountComments = 5;
  let currentCountComments = 0;

  bigPictureImg.querySelector('img').src = dataPhoto.url;
  bigPictureImg.querySelector('img').alt = dataPhoto.description;
  bigPictureLikes.textContent = dataPhoto.likes;
  bigPictureCommentsCount.textContent = dataPhoto.comments.length;
  bigPictureDescription.textContent = dataPhoto.description;

  const commentTemplate = document.querySelector('.social__comment');
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';
  const comments = [];
  let visibleCommentsCount = 0;

  dataPhoto.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    if (currentCountComments >= maxCountComments) {
      commentElement.classList.add('hidden');
    }

    commentsList.append(commentElement);
    if (currentCountComments < maxCountComments) {
      currentCountComments++;
    }

    comments.push(commentElement);
  });

  visibleCommentsCount = comments.filter((comment) => !comment.classList.contains('hidden')).length;
  commentCount.innerHTML = `${visibleCommentsCount} из <span class="comments-count">${bigPictureCommentsCount.textContent}</span> комментариев`;

  commentLoader.addEventListener('click', () => {
    if (maxCountComments + 5 <= dataPhoto.comments.length) {
      maxCountComments += 5;
    } else if (maxCountComments + 4 <= dataPhoto.comments.length) {
      maxCountComments += 4;
    } else if (maxCountComments + 3 <= dataPhoto.comments.length) {
      maxCountComments += 3;
    } else if (maxCountComments + 2 <= dataPhoto.comments.length) {
      maxCountComments += 2;
    } else if (maxCountComments + 1 <= dataPhoto.comments.length) {
      maxCountComments += 1;
    }

    if (parseInt(bigPictureCommentsCount.textContent, 10) > visibleCommentsCount) {
      for (let i = currentCountComments; i < maxCountComments; i++) {
        comments[i].classList.remove('hidden');
      }
    }

    visibleCommentsCount = comments.filter((comment) => !comment.classList.contains('hidden')).length;
    commentCount.innerHTML = `${visibleCommentsCount} из <span class="comments-count">${bigPictureCommentsCount.textContent}</span> комментариев`;
  });

  bigPictureClose.addEventListener('click', closeBigPicture);
}
