import { isEscapeKey } from './util.js';
import { bigPicture } from './constants.js';

const MAX_COUNT_COMMENTS_AT_PAGE = 5;

const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');

const commentTemplate = bigPicture.querySelector('.social__comment');
const commentsList = bigPicture.querySelector('.social__comments');

let maxCurrentCommentsCount = 5;

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
  commentLoader.removeEventListener('click', showMoreComments);
  maxCurrentCommentsCount = 5;
}

function showMoreComments () {
  let currentVisibleCommentsCount = Array.from(commentsList.children).filter((comment) => !comment.classList.contains('hidden')).length;
  let currentTotalCommentsCount = parseInt(bigPictureCommentsCount.textContent, 10);

  maxCurrentCommentsCount += 5;
  if (currentTotalCommentsCount > currentVisibleCommentsCount) {
    for (let i = currentVisibleCommentsCount; i < maxCurrentCommentsCount; i++) {
      if (typeof commentsList.children[i] !== 'undefined') {
        commentsList.children[i].classList.remove('hidden');
      }
    }
  }
  currentVisibleCommentsCount = Array.from(commentsList.children).filter((comment) => !comment.classList.contains('hidden')).length;
  currentTotalCommentsCount = parseInt(bigPictureCommentsCount.textContent, 10);
  commentCount.innerHTML = `${currentVisibleCommentsCount} из <span class="comments-count">${currentTotalCommentsCount}</span> комментариев`;

  if (currentVisibleCommentsCount === currentTotalCommentsCount) {
    commentLoader.classList.add('hidden');
  }
}

export function setBigPictureData (dataPhoto) {
  let currentCountCommentsAtPage = 0;

  bigPictureImg.querySelector('img').src = dataPhoto.url;
  bigPictureImg.querySelector('img').alt = dataPhoto.description;
  bigPictureLikes.textContent = dataPhoto.likes;
  bigPictureCommentsCount.textContent = dataPhoto.comments.length;
  bigPictureDescription.textContent = dataPhoto.description;

  let totalCommentsCount = 0;
  totalCommentsCount = parseInt(bigPictureCommentsCount.textContent, 10);

  commentsList.innerHTML = '';
  let visibleCommentsCount = 0;

  dataPhoto.comments.forEach((comment) => {
    if (commentLoader.classList.contains('hidden')) {
      commentLoader.classList.remove('hidden');
    }

    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    if (currentCountCommentsAtPage === MAX_COUNT_COMMENTS_AT_PAGE) {
      commentElement.classList.add('hidden');
    }

    commentsList.append(commentElement);
    if (currentCountCommentsAtPage < MAX_COUNT_COMMENTS_AT_PAGE) {
      currentCountCommentsAtPage++;
    }
  });

  visibleCommentsCount = Array.from(commentsList.children).filter((comment) => !comment.classList.contains('hidden')).length;
  commentCount.innerHTML = `${visibleCommentsCount} из <span class="comments-count">${totalCommentsCount}</span> комментариев`;

  if (visibleCommentsCount === totalCommentsCount) {
    commentLoader.classList.add('hidden');
  }

  commentLoader.addEventListener('click', showMoreComments);

  bigPictureClose.addEventListener('click', closeBigPicture);
}
