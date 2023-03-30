import { openUploadForm, uploadFile, setUploadFormSubmit, closeForm } from './img-upload-form.js';
import { getData } from './load.js';
import { renderPhotos } from './photos.js';
import { showAlert } from './util.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });


uploadFile.addEventListener('change', openUploadForm);
setUploadFormSubmit(closeForm);
