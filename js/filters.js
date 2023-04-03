import { createRandomIdFromRangeGenerator } from './data.js';
import { debounce } from './util.js';
import { RERENDER_DELAY } from './constants.js';
import { renderPhotos } from './photos.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

export const setDefaultFilter = (elements) => {
  const debouncedDefaultFilter = debounce(defaultFilter(elements), RERENDER_DELAY);
  filterDefault.addEventListener('click', debouncedDefaultFilter);
};

export const setRandomFilter = (elements, count) => {
  const debouncedRandomFilter = debounce(randomFilter(elements, count), RERENDER_DELAY);
  filterRandom.addEventListener('click', debouncedRandomFilter);
};


export const setDiscussedFilter = (elements) => {
  const debouncedDiscussedFilter = debounce(discussedFilter(elements), RERENDER_DELAY);
  filterDiscussed.addEventListener('click', debouncedDiscussedFilter);
};

function randomFilter (elements, count) {
  return function (evt) {
    const elementsCopy = elements.slice(0, 0);
    const generateElementId = createRandomIdFromRangeGenerator(0, elements.length - 1);
    for (let i = 0; i < count; i++) {
      elementsCopy.push(elements[generateElementId()]);
    }
    renderPhotos(elementsCopy, evt.target);
  };
}

function discussedFilter (elements) {
  return function (evt) {
    const elementsCopy = elements.slice(0).sort(sortByComments);
    renderPhotos(elementsCopy, evt.target);
  };
}

function defaultFilter (elements) {
  return function (evt) {
    renderPhotos(elements, evt.target);
  };
}

function sortByComments(photo1, photo2) {
  return photo2.comments.length - photo1.comments.length;
}
