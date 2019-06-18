var raundedRandomNumber;
var usersData = {
usersLikes: 0,
usersComments: 0
};

var randomNumber = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    raundedRandomNumber = Math.floor(randomNumber);
    return raundedRandomNumber;
  }

var url = [];
var takePicture = function(){
  for (var i = 0; i < 25; i++){
  url[i] = 'photos/' + [i] + '.jpg';
  return url;
  }
};



var like = [];
var likes = function(){
  for (var i = 0; i < 25; i++) {
    randomNumber(15, 200);
    usersData[i].usersLikes = raundedRandomNumber;
  }
};

var names = [
'Диван',  'Проспал', 'Дедлайн', 'Ерохин', 'Пепе', 'ЪЕЪ', 'Бинтуронг', 'Дед','Новый герой Новый поэт'
];




  var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
 ];
var avatars = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg'
];
