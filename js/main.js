import { openUploadForm, setUploadFormSubmit, closeForm } from './img-upload-form.js';
import { getData } from './load.js';
import { renderPhotos } from './photos.js';
import { showAlert } from './util.js';
import { setFilter } from './filters.js';
import { uploadFile } from './constants.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    setFilter(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });


uploadFile.addEventListener('change', openUploadForm);
setUploadFormSubmit(closeForm);
