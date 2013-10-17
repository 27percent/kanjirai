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
    $(document).bind('touchmove', function(e) {
      if (e.target === document.documentElement) {
        return e.preventDefault();
      }
    });
    $('.literally').literallycanvas();
    var $lc, channel;
    $lc = $('.literally').literallycanvas({ backgroundColor: 'whiteSmoke' });
    channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      return uploadToImgur($lc).done(function(url) {
        return sendImage(data.message, url);
      });
      console.log('An event was triggered with message: ' + data.message);
    });
  });

}).call(this);