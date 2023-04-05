import { uploadFile, imgUploadPreview, FILE_TYPES } from './constants.js';

export const setPreviewImage = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
};
