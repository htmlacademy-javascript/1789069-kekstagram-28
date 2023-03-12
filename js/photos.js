import { createSimilarPhotoDescriptions } from './data.js';

const similarListElement = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content;

const similarPhotos = createSimilarPhotoDescriptions();

const similarListFragment = document.createDocumentFragment();

similarPhotos.forEach((photo) => {
  const photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture').dataset.id = photo.id;
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  similarListFragment.append(photoElement);
});

similarListElement.append(similarListFragment);

export {similarListElement, similarPhotos};
