$(document).ready(function() {
  $('#playbutton').click(function() {
    var counter, timeLeft, countdown;
    timeLeft = 10;
    startClock(kanjiId);
    counter = setInterval(function(){stopClock(kanjiId); clearInterval(counter); $('#kanji').css('display', 'none'); $('#results').css('display', 'block'); $('#countdown').css('display', 'none'); },10000);
    countdown = setInterval(function(){ timeLeft--; $('#countdown').html(timeLeft); if (timeLeft <= 0) { clearInterval(countdown);} },1000);
    $('#kanjiname').css('display', 'block');
    $('#countdown').css('display', 'block');
    $('#kanji').css('display', 'block');
    $('#playbutton').css('display', 'none');
  });
});



// ==================================================================
// AJAX REQUESTS
// ==================================================================
var startClockAjax = function(kanjiId) {
  return $.ajax({
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: "POST",
    url: "/startclock/" + kanjiId
  });
}
var startClock = function(kanjiId) {
  var promise = startClockAjax(kanjiId);
  promise.success(function () {});
}

var stopClockAjax = function(kanjiId) {
  return $.ajax({
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: "POST",
    url: "/clock/" + kanjiId
  });
}
var stopClock = function(kanjiId) {
  var promise = stopClockAjax(kanjiId);
  promise.success(function () {});
}