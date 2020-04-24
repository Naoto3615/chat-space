$(function(){

  function buildHTML(message){
    image = ( message.image ) ? `<img class="lower-message__image" src=${message.image} >` : ""; //三項演算子
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
});