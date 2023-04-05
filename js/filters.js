import { debounce, createRandomIdFromRangeGenerator } from './util.js';
import { RERENDER_DELAY } from './constants.js';
import { renderPhotos } from './photos.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const setActiveFilterButton = (currentFilter) => {
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  if (currentFilter !== activeFilterButton) {
    activeFilterButton.classList.remove('img-filters__button--active');
  }
  currentFilter.classList.add('img-filters__button--active');
};

const sortByCommentsDecrease = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const randomFilter = (elements, count) => () => {
  const generateElementId = createRandomIdFromRangeGenerator(0, elements.length - 1);
  const elementsCopy = Array.from({ length: count }, () => elements[generateElementId()]);
  renderPhotos(elementsCopy);
};

const discussedFilter = (elements) => () => {
  const elementsCopy = elements.slice(0).sort(sortByCommentsDecrease);
  renderPhotos(elementsCopy);
};

const defaultFilter = (elements) => () => {
  renderPhotos(elements);
};

export const setDefaultFilter = (elements) => {
  const debouncedDefaultFilter = debounce(defaultFilter(elements), RERENDER_DELAY);
  filterDefault.addEventListener('click', (evt) => {
    setActiveFilterButton(evt.target);
    debouncedDefaultFilter();
  });
};

export const setRandomFilter = (elements, count) => {
  const debouncedRandomFilter = debounce(randomFilter(elements, count), RERENDER_DELAY);
  filterRandom.addEventListener('click', (evt) => {
    setActiveFilterButton(evt.target);
    debouncedRandomFilter();
  });
};

export const setDiscussedFilter = (elements) => {
  const debouncedDiscussedFilter = debounce(discussedFilter(elements), RERENDER_DELAY);
  filterDiscussed.addEventListener('click', (evt) => {
    setActiveFilterButton(evt.target);
    debouncedDiscussedFilter();
  });
};

