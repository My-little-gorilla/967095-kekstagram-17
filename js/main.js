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
    message: getRandomCommentMessage()
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
  // img
  // div
  //  span.likes
  //  span.comments

  var container = document.querySelector('.pictures');

  for (var i = 0; i < pictures.length; i++) {
    var picture = pictures[i];
    var pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.message;
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
