import { debounce, createRandomIdFromRangeGenerator } from './util.js';
import { RERENDER_DELAY } from './constants.js';
import { renderPhotos } from './photos.js';

const filtersForm = document.querySelector('.img-filters__form');

const setActiveFilterButton = (currentFilter) => {
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  if (currentFilter !== activeFilterButton) {
    activeFilterButton.classList.remove('img-filters__button--active');
  }
  currentFilter.classList.add('img-filters__button--active');
};

const sortByCommentsDecrease = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

export const randomFilter = (elements, count) => {
  const generateElementId = createRandomIdFromRangeGenerator(0, elements.length - 1);
  const filteredElements = Array.from({ length: count }, () => elements[generateElementId()]);
  return filteredElements;
};

export const discussedFilter = (elements) => {
  const filteredElements = elements.slice(0).sort(sortByCommentsDecrease);
  return filteredElements;
};

export const defaultFilter = (elements) => elements;


export const setFilter = (elements) => {

  const debouncedFilter = debounce(renderPhotos, RERENDER_DELAY);

  filtersForm.addEventListener('click', (evt) => {
    setActiveFilterButton(evt.target);
    debouncedFilter(elements, evt.target);
  });
};

