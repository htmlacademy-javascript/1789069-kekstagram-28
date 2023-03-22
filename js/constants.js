import { createSimilarPhotoDescriptions } from './data.js';

export const similarListElement = document.querySelector('.pictures');
export const similarPhotos = createSimilarPhotoDescriptions();
export const bigPicture = document.querySelector('.big-picture');
export const uploadForm = document.querySelector('.img-upload__form');
