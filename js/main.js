import { createSimilarPhoto } from './photos.js';
import { similarListElement, similarPhotos } from './constants.js';
import { setBigPictureData, openBigPicture } from './full-size-photo.js';

const similarListFragment = document.createDocumentFragment();

function handleOpenPopup(dataPhoto) {
  setBigPictureData(dataPhoto);
  openBigPicture();
}

similarPhotos.forEach((photo) => {
  similarListFragment.append(createSimilarPhoto(photo, handleOpenPopup));
});

similarListElement.append(similarListFragment);
