import { openUploadForm, uploadFile, setUploadFormSubmit, closeForm } from './img-upload-form.js';
import { getData } from './load.js';
import { renderPhotos } from './photos.js';
import { showAlert } from './util.js';
import { setRandomFilter, setDiscussedFilter, setDefaultFilter } from './filters.js';
import { COUNT_RANDOM_PHOTO } from './constants.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    setRandomFilter(photos, COUNT_RANDOM_PHOTO);
    setDiscussedFilter(photos);
    setDefaultFilter(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });


uploadFile.addEventListener('change', openUploadForm);
setUploadFormSubmit(closeForm);
