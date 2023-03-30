import { setBigPictureData, openBigPicture } from './full-size-photo.js';
import { similarListElement } from './constants.js';

const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

export function handleOpenPopup(dataPhoto) {
  setBigPictureData(dataPhoto);
  openBigPicture();
}

export const renderPhotos = (photos) => {
  const similarListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    similarListFragment.append(createSimilarPhoto(photo, handleOpenPopup));
  });

  similarListElement.append(similarListFragment);
};

export function createSimilarPhoto(dataPhoto) {
  const photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.dataset.id = dataPhoto.id;
  photoElement.querySelector('.picture__img').src = dataPhoto.url;
  photoElement.querySelector('.picture__likes').textContent = dataPhoto.likes;
  photoElement.querySelector('.picture__comments').textContent = dataPhoto.comments.length;

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    handleOpenPopup(dataPhoto);
  });

  return photoElement;
}
