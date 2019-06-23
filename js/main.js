var names = [
'Тогипи',  'Снорлакс', 'Пикачу', 'Мяут', 'Пепе', 'ЪЕЪ', 'Бинтуронг', 'Дед','Новый герой Новый поэт'
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
}

var takePhotos = function () {
  var photos = [];

  for (var i = 1; i <= 25; i++) {
    photos[i - 1] = 'photos/' + i + '.jpg';
  }
  return photos;
};


// сделать одну функцию
var getRandomElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
    return arr[getRandomInt(0, arr.length)];
}};


var getRandomComments = function () {
    for (var i = 0; i < comments.length; i++) {
    return comments[getRandomInt(0, comments.length)];
}};

var getRandomNames = function () {
    for (var i = 0; i < names.length; i++) {
    return names[getRandomInt(0, names.length)];
}};

var getRandomAvatars = function () {
    for (var i = 0; i < avatars.length; i++) {
    return avatars[getRandomInt(0, avatars.length)];
}};


// сделать одну функцию^^^^^



var getRandomLikes = function () {
  return getRandomInt(15, 201);
};

var photos = takePhotos();

var getRandomPicture = function () {
  var photo = photos.pop();
  var likes = getRandomLikes();
  var comments = getRandomComments();
  var picture = {
    url: photo,
    likes: likes,
    comments: comments
  };
  return picture;
};


var getRandomPictures = function () {
  var pictures = [];

  for (var i = 0; i < 25; i++) {
    pictures[i] = getRandomPicture();
  }
  return pictures;
}

console.log(getRandomPictures())


var getRandomComment = function () {
  var avatars = getRandomAvatars();
  var names = getRandomNames();
  var comments = getRandomComments();
  var userComment = {
    avatars: avatars,
    comments: comments,
    names: names
  };
  return userComment;
};


  var getRandomUserComments = function () {
  var userComments = [];

  for (var i = 0; i < 25; i++) {
    userComments[i] = getRandomComment();
  }
  return userComments;
}

console.log(getRandomUserComments());


// находит в разметке шаблон
var renderPicture = function () {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var pictureUserConteiner = document.querySelector('.pictures');
  var commentElement = document.querySelector('.picture__comments');
  var likeElement = document.querySelector('.picture__likes');
    for (var i = 0; i < 25; i++) {
      var pictureList = template.cloneNode(true);
 //      commentElement.textContent = picture.comments;
 //      likeElement.textContent = picture.likes;
      pictureUserConteiner.appendChild(pictureList);
 };
return pictureList;
};
console.log(renderPicture());


var getDescriptionItem = function() {
  var pictureElement = document.querySelector('.picture__img');
  for (i = 0; i < 25; i++){
    pictureElement.src = 'picture.url';
  }
};

getDescriptionItem();
