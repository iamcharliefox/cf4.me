$('document').ready(function(){

// smooth scrolling from https://css-tricks.com/snippets/jquery/smooth-scrolling/
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(':focus')) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  // ScrollOut - https://scroll-out.github.io/guide.html
  // animates the skillsbox when it is displayed in the viewport
  ScrollOut({
    targets: '.skills-box',
    offset: 350
  });
  // animates the skillsbox when it is displayed in the viewport
  ScrollOut({
    targets: '.contact-box'
  });

  // contact box events
  $('#contact-form').submit(function (e) {
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: form.serialize(), // serializes the form's elements.
      success: function (data) {
        console.log('foo');
        $('.message-open').removeClass('is-not-active');
        $('.form-open').removeClass('is-active');
        $('#say-hello').fadeOut(300);
        $('#submit-success').fadeIn(300);
        $('#say-hello-submit').hide()
        $('.social-icons').removeClass('is-active')
      }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
  });

  $('#say-hello').click(function () {
    $('.social-icons').addClass('is-active');
    $('.form-open').toggleClass('is-active');
  });
  
  $('#scroll-to-hello').click(function () {
    $('.social-icons').addClass('is-active');
    $('.form-open').addClass('is-active');
    $([document.documentElement, document.body]).animate({
      scrollTop: $('.contact-box').offset().top - 100
    }, 1000);
  });
  
  $('.say-hello').click(function () {
    if ($('.form-open').hasClass('is-active')) {
      $('#say-hello').hide()
      $('#say-hello-submit').show();
      $('.message-open').addClass('is-not-active');
    } else {
      $('#say-hello-submit').hide();
      $('#say-hello').show()
      $('.message-open').fadeIn(300);
      $('.message-open').removeClass('is-not-active');
    }
  });
  
  $('.success-delete').click(function () {
    $('#submit-success').hide();
    $('#say-hello').show();
  });  


});











