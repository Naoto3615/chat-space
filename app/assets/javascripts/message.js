$(function(){
  
  function buildHTML(message){

    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : '';

    // var image = '';
    // if ( message.image ) {
    //   image = `<img class="lower-message__image" src=${message.image} >`
    // };

                var html =  
                ` <div class="messages" data-message-id="${message.id}">
                    <div class="user-date">
                      <div class="user-date--user">
                        ${message.user_name}
                      </div>
                      <div class="user-date--date">
                        ${message.date}
                      </div>
                    </div>
                <div class="chat-message">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  ${image}
                </div>
              </div>`
          return html; 
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat').append(html);
      $("form")[0].reset();
      $('input').prop('disabled', false);
      $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight}, 50);
    })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
        $('input').prop('disabled', false);
    });
  });







  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.messages:last').data("message-id"); 
      console.log(last_message_id)

      $.ajax({
        url: "api/messages",
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_message_id} 
      })
      .done(function (messages) {
        // console.log(messages) 
        var insertHTML = '';
        if (messages.length > 0){
          messages.forEach(function (message) {
            insertHTML = buildHTML(message); 
            $('.main-chat').append(insertHTML);
          })
          $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
  });  

     
