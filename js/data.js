import { getRandomInteger, getRandomArrayElement } from './util.js';

const PHOTO_DESCRIPTIONS = [
  'Фотография популярной достопримечательности',
  'Фотография недавно открывшегося ресторана',
  'Фотография делового центра',
  'Фотография строительства жилого комплекса',
  'Фотография с выставки научных достижений',
  'Фотография с празднования Дня города'
];

const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артем',
  'Николай',
  'Галина',
  'Светлана',
  'Полина',
  'Кирилл',
  'Александр',
  'Виктория',
  'Андрей',
  'Софья'
];

const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25;

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoAddress = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 100);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS_MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoAddress()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 10)}, createComment)
});

export const createSimilarPhotoDescriptions = () => Array.from({length: SIMILAR_PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);
