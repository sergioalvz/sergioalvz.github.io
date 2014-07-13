var installSideMenuBar = function() {
  var current_viewport_width = $(window).width();
  if(current_viewport_width >= 1380) {
    showSideBarMenu();
  } else {
    collapseSideBarMenu();
  }
};

var showSideBarMenu = function() {
  var $menu = $('.side-menu');
  var $menu_slider = $('.menu-slider');

  $menu_slider.animate({ left: "270px" }, 0);
  $menu.animate({ left: "0" }, 0);
};

var collapseSideBarMenu = function() {
  var $menu = $('.side-menu');
  var $menu_slider = $('.menu-slider');

  $menu_slider.animate({ left: "0" }, 0);
  $menu.animate({ left: "-270px" }, 0);
};

$(document).ready(function(){
  installSideMenuBar();

  $('.show-hide-sidemenu').click(function(event) {
    var $menu = $('.side-menu');

    if($menu.css('left') === '-270px') {
      showSideBarMenu();
    }else {
      collapseSideBarMenu();
    }
  });
});
