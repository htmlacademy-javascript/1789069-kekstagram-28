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

  let maxCountCommentsAtPage = 5;
  let currentCountCommentsAtPage = 0;

  bigPictureImg.querySelector('img').src = dataPhoto.url;
  bigPictureImg.querySelector('img').alt = dataPhoto.description;
  bigPictureLikes.textContent = dataPhoto.likes;
  bigPictureCommentsCount.textContent = dataPhoto.comments.length;
  bigPictureDescription.textContent = dataPhoto.description;

  let totalCommentsCount = 0;
  totalCommentsCount = parseInt(bigPictureCommentsCount.textContent, 10);

  const commentTemplate = document.querySelector('.social__comment');
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';
  let visibleCommentsCount = 0;

  dataPhoto.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    if (currentCountCommentsAtPage === maxCountCommentsAtPage) {
      commentElement.classList.add('hidden');
    }

    commentsList.append(commentElement);
    if (currentCountCommentsAtPage < maxCountCommentsAtPage) {
      currentCountCommentsAtPage++;
    }
  });

  visibleCommentsCount = Array.from(commentsList.children).filter((comment) => !comment.classList.contains('hidden')).length;
  commentCount.innerHTML = `${visibleCommentsCount} из <span class="comments-count">${totalCommentsCount}</span> комментариев`;

  commentLoader.addEventListener('click', () => {

    if (maxCountCommentsAtPage + (totalCommentsCount - maxCountCommentsAtPage) <= totalCommentsCount) {
      maxCountCommentsAtPage += totalCommentsCount - maxCountCommentsAtPage;
    }

    if (totalCommentsCount > visibleCommentsCount) {
      for (let i = currentCountCommentsAtPage; i < maxCountCommentsAtPage; i++) {
        commentsList.children[i].classList.remove('hidden');
      }
      currentCountCommentsAtPage += maxCountCommentsAtPage - currentCountCommentsAtPage;
    }

    visibleCommentsCount = Array.from(commentsList.children).filter((comment) => !comment.classList.contains('hidden')).length;
    commentCount.innerHTML = `${visibleCommentsCount} из <span class="comments-count">${totalCommentsCount}</span> комментариев`;
  });

  bigPictureClose.addEventListener('click', closeBigPicture);
}
