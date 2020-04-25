$(function(){
  
  function buildHTML(message){
    var image = '';
    if ( message.image.url ) {
      image = `<img class="lower-message__image" src=${message.image.url} >`//三項演算子
    };
  
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
        console.log(messages) 
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.main-chat').append(insertHTML);
        })
        $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
  });  

     
