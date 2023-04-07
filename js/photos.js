import { setBigPictureData, openBigPicture } from './full-size-photo.js';
import { similarListElement, similarPhotoTemplate, COUNT_RANDOM_PHOTO } from './constants.js';
import { randomFilter, discussedFilter, defaultFilter } from './filters.js';

const imgFilters = document.querySelector('.img-filters');

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

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

export const renderPhotos = (photos, filter = null) => {

  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });

  const similarListFragment = document.createDocumentFragment();

  if (filter) {
    switch (filter) {
      case filterRandom:
        photos = randomFilter(photos, COUNT_RANDOM_PHOTO);
        break;
      case filterDiscussed:
        photos = discussedFilter(photos);
        break;
      case filterDefault:
        photos = defaultFilter(photos);
        break;
      default:
        break;
    }
  }
  photos.forEach((photo) => {
    similarListFragment.append(createSimilarPhoto(photo, handleOpenPopup));
  });

  similarListElement.append(similarListFragment);

  imgFilters.classList.remove('img-filters--inactive');
};
