var navMain = document.querySelector('.page-header');
var navToggle = document.querySelector('.page-header__toggle');

var packetLink = document.querySelector('.packets__link');
packetLink.classList.add('packets__link--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('page-header--closed')) {
    navMain.classList.remove('page-header--closed');
    navMain.classList.add('page-header--opened');
  } else {
    navMain.classList.add('page-header--closed');
    navMain.classList.remove('page-header--opened');
  }
});


