'use strict';
var ESC_BUTTON = 27;
var MAX_FILTER_VALUE = 100;
var MAX_VALUE = 100;
var VALUE_STEP = 25;

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
var levelContainer = document.querySelector('.effect-level');
levelContainer.classList.add('hidden');
var commentField = document.querySelector('.text__description');

var close = function () {
  editPhoto.classList.add('hidden');
  form.reset();
};

var deliteModale = function (evt) {
  if (evt.keyCode === ESC_BUTTON) {
    close();
  }
};

document.addEventListener('keydown', deliteModale);

editForm.addEventListener('change', function () {
  editPhoto.classList.remove('hidden');
  resetFilter();
});

closeButton.addEventListener('click', function () {
  close();
});

commentField.addEventListener('focus', function () {
  document.removeEventListener('keydown', deliteModale);
});

commentField.addEventListener('blur', function () {
  document.addEventListener('keydown', deliteModale);
});

var effectsRadio = document.querySelector('.effects');
effectsRadio.addEventListener('change', function (evt) {
  applyFilter(evt.target.value, MAX_FILTER_VALUE);
});


var effectLevelValue = document.querySelector('.effect-level__value');
var effectPin = document.querySelector('.effect-level__pin');
var effectDepth = document.querySelector('.effect-level__line');
var effectDepthFill = document.querySelector('.effect-level__depth');

// пин перемещение пина

var addEvent = function (element, event, handler, useCapture) {
  element.addEventListener(event, handler, useCapture);
};

var removeEvent = function (element, event, handler, useCapture) {
  element.removeEventListener(event, handler, useCapture);
};

var countEffectDepthPercent = function (value, maxValue) {
  return 100 * value / maxValue;
};

addEvent(effectPin, 'mousedown', function (evt) {
  var rect = effectDepth.getBoundingClientRect();
  // var pinRect = effectPin.getBoundingClientRect();
  var maxLeft = rect.width;
  var offsetX = evt.offsetX;

  var onMove = function (evt) {
    evt.stopPropagation();

    var left = evt.clientX - rect.left - offsetX;
    if (left < 0) {
      left = 0;
    }
    if (left > maxLeft) {
      left = maxLeft;
    }

    effectPin.style.left = left + 'px';
    effectLevelValue = Math.floor(countEffectDepthPercent(left, maxLeft));
    applyFilter(currentFilter, effectLevelValue);
    effectDepthFill.style.width = effectLevelValue + '%';
  };

  var onUp = function () {
    removeEvent(document, 'mousemove', onMove, true);
    removeEvent(document, 'mouseup', onUp);
  };

  addEvent(document, 'mousemove', onMove, true);
  addEvent(document, 'mouseup', onUp);
});


var imageWrapper = document.querySelector('.img-upload__preview');
var image = imageWrapper.querySelector('img');

var currentFilter = 'none';

var radioButtons = effectsRadio.querySelectorAll('.effects__radio');

var resetRadioButtons = function () {
  for (var i = 0; i < radioButtons.length; i++) {
    var radioButton = radioButtons[i];
    radioButton.checked = radioButton.value === 'none';
  }
};

var resetFilter = function () {
  applyFilter('none', 100);
  resetRadioButtons();
  zoom(100);
};

var applyFilter = function (filter, value) {
  currentFilter = filter;
  if (filter === 'none') {
    levelContainer.classList.add('hidden');
    image.style.filter = null;
    return;
  }
  // Показываем полоску фильтров
  levelContainer.classList.remove('hidden');
  if (filter === 'chrome') {
    image.style.filter = 'grayscale(' + (value / MAX_FILTER_VALUE) + ')';
    return;
  }
  if (filter === 'sepia') {
    image.style.filter = 'sepia(' + (value / MAX_FILTER_VALUE) + ')';
    return;
  }
  if (filter === 'marvin') {
    image.style.filter = 'invert(' + value + '%)';
    return;
  }
  if (filter === 'phobos') {
    image.style.filter = 'blur(' + (3 * value / MAX_FILTER_VALUE) + 'px)';
    return;
  }
  if (filter === 'heat') {
    image.style.filter = 'brightness(' + (3 * value / MAX_FILTER_VALUE) + ')';
    return;
  }
};

// В одном из следующих заданий мы будем менять effectLevelValue.value
// во время перетаскивания, а пока нам достаточно того, что записано в нем
// по умолчанию


effectPin.addEventListener('mouseup', function () {
  var value = effectLevelValue.value;
  applyFilter(currentFilter, value);
});

// zoom

var zoomSmaler = document.querySelector('.scale__control--smaller');
var zoomBigger = document.querySelector('.scale__control--bigger');
var zoomValueControl = document.querySelector('.scale__control--value');
zoomValueControl.value = 100;
var zoomValue = 100;

var zoom = function (value) {
  zoomValue += value;
  if (zoomValue > MAX_VALUE) {
    zoomValue = MAX_VALUE;
  }
  if (zoomValue < VALUE_STEP) {
    zoomValue = VALUE_STEP;
  }
  zoomValueControl.value = zoomValue;
  image.style.transform = 'scale(' + (zoomValue / MAX_VALUE) + ')';
};
zoomBigger.addEventListener('click', function () {
  zoom(VALUE_STEP);
});
zoomSmaler.addEventListener('click', function () {
  zoom(VALUE_STEP * -1);
});
