(function ($) {
  $('document').ready(function() {
    $('.styleguide--sidebar').css('left', ($('.styleguide--content').outerWidth() + 120));
  });
})(jQuery)