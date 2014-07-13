var MINIMUM_SCREEN_WIDTH = 745;


var installSideMenuBar = function() {
  var current_viewport_width = $(window).width();
  if(current_viewport_width >= MINIMUM_SCREEN_WIDTH) {
    showSideBarMenu();
  } else {
    collapseSideBarMenu();
  }
};

var isSideBarMenuDisplayed = function() {
  return $('.side-menu').css('left') === '-270px';
};

var showSideBarMenu = function() {
  var $menu = $('.side-menu');
  var $menu_slider = $('.menu-slider');

  $menu_slider.animate({ left: "270px" }, 0);
  $menu.animate({ left: "0" }, 0);

  var current_viewport_width = $(window).width();
  if(current_viewport_width >= MINIMUM_SCREEN_WIDTH) {
    var $main_content = $('.main-content');
    $main_content.css('padding-left', '320px');
  }
};

var collapseSideBarMenu = function() {
  var $menu = $('.side-menu');
  var $menu_slider = $('.menu-slider');

  $menu_slider.animate({ left: "0" }, 0);
  $menu.animate({ left: "-270px" }, 0);

  var current_viewport_width = $(window).width();
  if(current_viewport_width >= MINIMUM_SCREEN_WIDTH) {
    var $main_content = $('.main-content');
    $main_content.css('padding-left', '50px');
  }
};

$(document).ready(function(){
  installSideMenuBar();

  $('.menu-slider').click(function(event) {
    if(isSideBarMenuDisplayed()) {
      showSideBarMenu();
    }else {
      collapseSideBarMenu();
    }
  });
});
