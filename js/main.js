import { createSimilarPhoto } from './photos.js';
import { similarListElement, similarPhotos } from './constants.js';
import { setBigPictureData, openBigPicture } from './full-size-photo.js';
import { openUploadForm, uploadFile } from './img-upload-form.js';

const similarListFragment = document.createDocumentFragment();

function handleOpenPopup(dataPhoto) {
  setBigPictureData(dataPhoto);
  openBigPicture();
}

similarPhotos.forEach((photo) => {
  similarListFragment.append(createSimilarPhoto(photo, handleOpenPopup));
});

similarListElement.append(similarListFragment);

uploadFile.addEventListener('change', openUploadForm);
