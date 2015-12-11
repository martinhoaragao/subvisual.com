(function(window) {
  const viewportWidth = 1440;
  const viewportHeight = 540;
  const lineMinWidth = 100;
  const lineMaxWidth = 500;
  const colors = ['#0ADCF2', '#EC7376', '#FCD380', '#E1EAF6', '#8DC8DC', '#4DEBC3'];
  let lines;
  let trails;
  let xwings;
  let speedTable = {
    get 1() {
      return getRandomInt(65, 70);
    },
    get 2() {
      return getRandomInt(50, 55);
    },
    get 3() {
      return getRandomInt(45, 50);
    },
    get 4() {
      return getRandomInt(35, 40);
    },
    get 5() {
      return getRandomInt(30, 35);
    },
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function initialPosition(width, direction) {
    if (direction === 1) {
      return -width;
    } else {
      return viewportWidth;
    }
  }

  function lineHeight(width) {
    if (width < lineMaxWidth/2) {
      return 1;
    } else {
      return 2;
    }
  }

  function resetLine(direction, width, i) {
    let color = randomColor();
    return {
      attr: {
        width: width,
        height: lineHeight(width)
      },
      stroke: color,
      fill: color,
      x: initialPosition(width, direction),
      y: getY(i)
    };
  }

  function getY(i) {
    let sectionHeight = viewportHeight / groups.length;
    let vPadding = 20;
    return getRandomInt((sectionHeight * i) + vPadding, (sectionHeight * i + sectionHeight) - vPadding);
  }

  function randomDirection() {
    return Math.round(Math.random()) * 2 - 1;
  }

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function getSpeed(width) {
    let scaleFactor = Math.floor(width / 75);
    return speedTable[scaleFactor];
  }

  function translateX(direction, elementWidth) {
    let sign = '+';
    if (direction < 0) sign = '-';
    return `${sign}=${viewportWidth + elementWidth}`;
  }

  function animateLine(group, i, trail, xwing) {
    let width = getRandomInt(lineMinWidth, lineMaxWidth);
    let direction = randomDirection();
    let settings = resetLine(direction, width, i);

    if (direction > 0) {
      TweenLite.set(group, { rotation: 180, transformOrigin: '50% 50%' });
    } else {
      TweenLite.set(group, { rotation: 0, transformOrigin: '50% 50%' });
    }

    TweenLite.set(trail, {
      attr: settings.attr,
      stroke: settings.stroke,
      fill: settings.fill,
    });

    TweenLite.set(group, {
      x: settings.x,
      y: settings.y
    });

    TweenLite.to(group, getSpeed(width), {
      x: translateX(direction, width),
      delay: 0.8 * i,
      onComplete: animateLine,
      onCompleteParams: [group, i, trail, xwing]
    });
  }

  function animateLines(svg) {
    groups = svg.querySelectorAll('.Xwings');
    trails = svg.querySelectorAll('.Trail');
    xwings = svg.querySelectorAll('.x-wing');

    for(let i = 0; i < groups.length; i++) {
      animateLine(groups[i], i, trails[i], xwings[i]);
    };
  }

  window.homepage = window.homepage || {};
  window.homepage.animateLines = animateLines;
})(window);
