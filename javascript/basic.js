var MINIMUM_SCREEN_WIDTH = 745;
var MOVABLE_CONTENT = ".main-content, .page-footer";


var installSideMenuBar = function() {
  var current_viewport_width = $(window).width();
  if(current_viewport_width >= MINIMUM_SCREEN_WIDTH) {
    showSideBarMenu();
  } else {
    collapseSideBarMenu();
  }
};

var isSideBarMenuDisplayed = function() {
  return $('.sidebar').css('left') !== '-250px';
};

var showSideBarMenu = function() {
  var $menu = $('.sidebar');
  var $menu_slider = $('.menu-slider');

  $menu_slider.animate({ left: "250px" }, 0);
  $menu.animate({ left: "0" }, 0);

  var current_viewport_width = $(window).width();
  if(current_viewport_width >= MINIMUM_SCREEN_WIDTH) {
    var $main_content = $(MOVABLE_CONTENT);
    $main_content.css('padding-left', '300px');
  }
};

var collapseSideBarMenu = function() {
  var $menu = $('.sidebar');
  var $menu_slider = $('.menu-slider');

  $menu_slider.animate({ left: "0" }, 0);
  $menu.animate({ left: "-250px" }, 0);

  var current_viewport_width = $(window).width();
  if(current_viewport_width >= MINIMUM_SCREEN_WIDTH) {
    var $main_content = $(MOVABLE_CONTENT);
    $main_content.css('padding-left', '50px');
  }
};

$(document).ready(function(){
  installSideMenuBar();

  $('.menu-slider').click(function(event) {
    if(isSideBarMenuDisplayed()) {
      collapseSideBarMenu();
    }else {
      showSideBarMenu();
    }
  });
});
