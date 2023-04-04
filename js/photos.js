import { setBigPictureData, openBigPicture } from './full-size-photo.js';
import { similarListElement, similarPhotoTemplate } from './constants.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');

export function handleOpenPopup(dataPhoto) {
  setBigPictureData(dataPhoto);
  openBigPicture();
}

export const renderPhotos = (photos, currentFilter = null) => {

  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });

  const similarListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    similarListFragment.append(createSimilarPhoto(photo, handleOpenPopup));
  });

  similarListElement.append(similarListFragment);

  imgFilters.classList.remove('img-filters--inactive');

  if (currentFilter) {
    imgFiltersButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
      if (button === currentFilter) {
        button.classList.add('img-filters__button--active');
      }
    });
  }
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
