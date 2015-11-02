$('#LogoTransparency').load(function() {
  var animating = false;

  var svg = $('#LogoTransparency').contents();

  function onAnimationFinished() {
    animating = false;
  }

  function logoSetup() {
    svg.find('.LogoTransparency-piece').each(function() {
      TweenLite.set(svg.find('.LogoTransparency-piece'), { strokeDasharray: this.getTotalLength(), strokeDashoffset: this.getTotalLength()  });
    });
  }

  function logoAnimation() {
    if (animating) {
      return;
    }
    animating = true;
    logoSetup();
    svg.find('.LogoTransparency-piece').each(function() {
      TweenLite.to(svg.find('.LogoTransparency-piece'), 0.8, { strokeDashoffset: 0, onComplete: onAnimationFinished });
    });
  }

  logoSetup();
  $('#LogoTransparency').on('mouseenter', logoAnimation);
  setTimeout(function() {
    window.animationHelpers.onScrollToElement('#LogoTransparency', 1, logoAnimation);
  }, 500);
});
