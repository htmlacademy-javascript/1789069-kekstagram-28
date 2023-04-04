import { uploadFile, imgUploadPreview } from './img-upload-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];


export function setPreviewImage () {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
}
