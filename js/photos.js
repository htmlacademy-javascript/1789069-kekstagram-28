const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

export function createSimilarPhoto(dataPhoto, handleOpenPopup) {
  const photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.dataset.id = dataPhoto.id;
  photoElement.querySelector('.picture__img').src = dataPhoto.url;
  photoElement.querySelector('.picture__likes').textContent = dataPhoto.likes;
  photoElement.querySelector('.picture__comments').textContent = dataPhoto.comments.length;

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    handleOpenPopup(dataPhoto);
  });

  return photoElement;
}
