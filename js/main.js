'use strict';

var names = [
  'Тогипи', 'Снорлакс', 'Пикачу', 'Мяут', 'Пепе', 'ЪЕЪ', 'Бинтуронг', 'Дед', 'Новый герой Новый поэт'
];

var avatars = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg'
];
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var takePhotos = function () {
  var photos = [];

  for (var i = 1; i <= 25; i++) {
    photos[i - 1] = 'photos/' + i + '.jpg';
  }
  return photos;
};


// сделать одну функцию

var getRandomCommentMessage = function () {
  return comments[getRandomInt(0, comments.length)];
};

var getRandomName = function () {
  return names[getRandomInt(0, names.length)];
};

var getRandomAvatar = function () {
  return avatars[getRandomInt(0, avatars.length)];
};


// сделать одну функцию^^^^^

var getRandomLikes = function () {
  return getRandomInt(15, 201);
};

var photos = takePhotos();

var getRandomComment = function () {
  var userComment = {
    avatar: getRandomAvatar(),
    message: getRandomCommentMessage(),
    name: getRandomName()
  };
  return userComment;
};

var getRandomComments = function () {
  var userComments = [];

  for (var i = 0; i < 25; i++) {
    userComments[i] = getRandomComment();
  }
  return userComments;
};

var getRandomPicture = function () {
  var photo = photos.pop();
  var likes = getRandomLikes();

  var picture = {
    url: photo,
    likes: likes,
    comments: getRandomComments()
  };
  return picture;
};

var getRandomPictures = function () {
  var pictures = [];

  for (var i = 0; i < 25; i++) {
    pictures[i] = getRandomPicture();
  }
  return pictures;
};

var renderPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content.querySelector('.picture');

  var container = document.querySelector('.pictures');

  for (var i = 0; i < pictures.length; i++) {
    var picture = pictures[i];
    var pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    fragment.appendChild(pictureElement);
  }

  container.appendChild(fragment);
};

var pictures = getRandomPictures();
renderPictures(pictures);

// 1. Получить внутрь функции массив картинок
// 2. Найти в DOM дереве наш Шаблон
// 3. Найти в DOM дереве, куда вставлять все наши картинки
// 4. Для каждой картинки
//  4. 1. Склонировать Шаблон
//  4. 2. Добавить в шаблон
//    4. 2. 1.  src картинки
//    4. 2. 2.  Число лайков
//    4. 2. 2.  Число комментариев
//  4. 3. Добавить получившийся шаблон во фрагмент
// 5. Вставить фрагмент в конец контейнера
var form = document.querySelector('.img-upload__form');
var closeButton = document.querySelector('.img-upload__cancel');
var editForm = document.querySelector('#upload-file');
var editPhoto = document.querySelector('.img-upload__overlay');
var largeImage = document.querySelector('.img-upload__preview');
var levelContainer = document.querySelector('.effect-level');
levelContainer.classList.add('hidden');

editForm.addEventListener('change', function () {
  editPhoto.classList.remove('hidden');
});

closeButton.addEventListener('click', function () {
  editPhoto.classList.add('hidden');
  form.reset();
});

var effectsRadio = document.querySelector('.effects');
effectsRadio.addEventListener('change', function (evt) {
  applyFilter(evt.target.value, 100);
});
var applyFilter = function (filter) {
  largeImage.className = 'effects__preview--' + filter;
  if (filter === 'none') {
    levelContainer.classList.add('hidden');
  } else {
    levelContainer.classList.remove('hidden');
  }
};
// zoom

var zoomSmaler = document.querySelector('.scale__control--smaller');
var zoomBigger = document.querySelector('.scale__control--bigger');
var zoomValueControl = document.querySelector('.scale__control--value');
zoomValueControl.value = 100;
var ZOOM_VALUE = 100;
var VALUE = 25;

var zoom = function (value) {
  ZOOM_VALUE += value;
  if (ZOOM_VALUE > 100) {
    ZOOM_VALUE = 100;
  }
  if (ZOOM_VALUE < 25) {
    ZOOM_VALUE = 25;
  }
  zoomValueControl.value = ZOOM_VALUE;
  largeImage.style.transform = 'scale(' + (ZOOM_VALUE / 100) + ')';
};
zoomBigger.addEventListener('click', function () {
  zoom(VALUE);
});
zoomSmaler.addEventListener('click', function () {
  zoom(VALUE * -1);
});

// глубина эффекта
// var effectsItems = document.querySelectorAll('.effects__item');
var effectLevelValue = document.querySelector('.effect-level__value');
effectLevelValue = 100;


// var previewName = document.querySelectorAll('.effects__preview');
var effectPin = document.querySelector('.effect-level__pin');
var VALUE_STEP_EFFECT = -1;


var changeDeepEffect = function (valueStep) {
  effectLevelValue += valueStep;
  if (effectLevelValue > 100) {
    effectLevelValue = 100;
  }
  if (effectLevelValue < 0) {
    effectLevelValue = 0;
  }
  if (largeImage.className === 'effects__preview--chrome') {
    largeImage.style.filter = 'grayscale(' + (effectLevelValue / 100) + ')';
  }
  if (largeImage.className === 'effects__preview--sepia') {
    largeImage.style.filter = 'sepia(' + (effectLevelValue / 100) + ')';
  }
  if (largeImage.className === 'effects__preview--marvin') {
    largeImage.style.filter = 'invert(' + (effectLevelValue / 100) + ')';
  }
  if (largeImage.className === 'effects__preview--phobos') {
    largeImage.style.filter = 'blur(' + (effectLevelValue / 100) + ')';
  }
  if (largeImage.className === 'effects__preview--heat') {
    largeImage.style.filter = 'brightness(' + (effectLevelValue / 100) + ')';
  }
};

// effectPin.addEventListener('mouseup', function () {
//   changeDeepEffect(VALUE_STEP_EFFECT);
// });

effectPin.addEventListener('mouseup', function () {
  changeDeepEffect(VALUE_STEP_EFFECT * -1);
});
