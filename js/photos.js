import { setBigPictureData, openBigPicture } from './full-size-photo.js';
import { similarListElement, similarPhotoTemplate } from './constants.js';

const imgFilters = document.querySelector('.img-filters');

export const handleOpenPopup = (dataPhoto) => {
  setBigPictureData(dataPhoto);
  openBigPicture();
};

export const createSimilarPhoto = (dataPhoto) => {
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
};

export const renderPhotos = (photos) => {

  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });

  const similarListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    similarListFragment.append(createSimilarPhoto(photo, handleOpenPopup));
  });

  similarListElement.append(similarListFragment);

  imgFilters.classList.remove('img-filters--inactive');
};
