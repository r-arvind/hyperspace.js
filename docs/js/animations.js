$("#rocket-scroll").click(function() {
    $('html,body').animate({
        scrollTop: $(".features").offset().top},
        'slow');
});