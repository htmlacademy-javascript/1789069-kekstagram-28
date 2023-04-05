import { uploadFile, imgUploadPreview, FILE_TYPES } from './constants.js';

const previewImages = document.querySelectorAll('.effects__preview');

export const setPreviewImage = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const fileUrl = URL.createObjectURL(file);
    imgUploadPreview.src = fileUrl;
    previewImages.forEach((image) => {
      image.style.backgroundImage = `url(${fileUrl})`;
    });
  }
};
