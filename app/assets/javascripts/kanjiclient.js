(function() {
  var uploadToImgur, sendImageAjax, sendImage;
  
  sendImageAjax = function(kanjiId, imageUrl) {
    return $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: "POST",
      url: "/answers",
      data: JSON.stringify({ "imageUrl" : imageUrl, "kanjiId" : kanjiId })
    });
  }
  sendImage = function(kanjiId, imageUrl) {
    console.log('Sending image');
    $('.uploading').css('display', 'block');
    var promise = sendImageAjax(kanjiId, imageUrl);
    promise.success(function () { location.reload(); });
  }

  uploadToImgur = function($lc) {
    var d, img;
    d = new $.Deferred();
    img = $lc.canvasForExport().toDataURL().split(',')[1];
    $.ajax({
      url: 'http://api.imgur.com/2/upload.json',
      type: 'POST',
      data: {
        type: 'base64',
        key: '9600756ae5f127ca192d991140ee28c4',
        name: 'kanjidrawing.png',
        title: 'A Kanji drawing',
        caption: 'Drawn with KanjiRai',
        image: img
      },
      dataType: 'json',
      success: function(data) {
        return d.resolve(data.upload.links.imgur_page);
      },
      error: function(rsp) {
        d.reject("Image upload failed.");
        return console.log(rsp);
      }
    });
    d.promise();
    return d;
  };

  //Alrighty! Time to execute some code!
  $(document).ready(function() {
    console.log('called');
    var waitingCount = 0;
    setInterval(function(){
      waitingCount++;
      $('.waiting').html("Waiting." + new Array(waitingCount % 4).join('.'));
      if (waitingCount == 4) { waitingCount = 1 };
    }, 1000);
    $(document).bind('touchmove', function(e) {
      if (e.target === document.documentElement) {
        return e.preventDefault();
      }
    });
    $('.literally').literallycanvas();
    var $lc, channel;
    $lc = $('.literally').literallycanvas({ background: 'url(\'wait.png\') center center no-repeat' });
    channel = pusher.subscribe('my-channel');
    channel.bind('started', function(data) {
      console.log('An event was triggered with message: ' + data.message);
      $('canvas').css('background', 'url(\'assets/draw.png\') center center no-repeat #f5f5f5')
      var timeLeft, countdown;
      timeLeft = 9;
      countdown = setInterval(function(){ timeLeft--; $('.countdown').html(timeLeft); if (timeLeft <= 0) { clearInterval(countdown);} },1000);
    });
    channel.bind('my-event', function(data) {
      return uploadToImgur($lc).done(function(url) {
        return sendImage(data.message, url);
      });
      console.log('An event was triggered with message: ' + data.message);
    });
  });

}).call(this);