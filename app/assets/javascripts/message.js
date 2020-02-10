$(function(){

    function buildHTML(message){

      if (message.content && message.image) {
        let html = `<div class="message" data-message-id=${message.id}>
                      <div class="message__info">
                       <p class="message__info__tolker">
                          ${message.user_name}
                        </p>
                        <p class="message__info__data">
                          ${message.time}
                        </p>
                      </div>
                      <div class="message-main__text">
                        <p class="message__text__content">
                          ${message.content}
                        </p>
                        <img src="${message.image} "class="message__text__image" >
                     </div>`
                  return html;
      } else if (message.content) {
        let html = `<div class="message" data-message-id=${message.id}>
                      <div class="message__info">
                       <p class="message__info__tolker">
                          ${message.user_name}
                        </p>
                        <p class="message__info__data">
                          ${message.time}
                        </p>
                      </div>
                      <div class="message-main__text">
                        <p class="message__text__content">
                          ${message.content}
                        </p>
                      </div>
                    </div>`
                    return html;
      } else if (message.image) {
        let html = `<div class="message" data-message-id=${message.id}>
                      <div class="message__info">
                        <p class="message__info__tolker">
                          ${message.user_name}
                        </p>
                        <p class="message__info__data">
                          ${message.time}
                        </p>
                      </div>
                      <div class="message-main__text">
                        <img src="${message.image} "class="message__text__image" >
                      </div>
                    </div>`
                    return html;
                };
    };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST", 
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html)
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました")
    })
    .always(function() {
      $('.submit-btn').prop('disabled',false);
    });
  });

  let reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id},
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    }
  })
    .fail(function() {
      console.log('error')
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});