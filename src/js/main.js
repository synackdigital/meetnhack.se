$(document).ready(function () {
    $('#navigation').localScroll({
      offset: -60
    });
    $('[data-toggle="tipsy"]').tipsy({
      fade: true,
      gravity: 's',
      delayIn: 200,
      delayOut: 800
    });
});