$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__info">
                      <p class="message__info__tolker">
                        ${message.user_name}
                      </p>
                      <p class="message__info__data">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="message-main__text">
                      <p class="message__text__content">
                        ${message.content}
                      </p>
                    </div>
                    <img src=${message.image} >
                  </div>`
                return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__info">
                      <p class="message__info__tolker">
                        ${message.user_name}
                      </p>
                      <p class="message__info__data">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="message-main__text">
                      <p class="message__text__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
                return html;
              };
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
      $('.messages').append(html)
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.submit-btn').prop('disabled',false);
    });

  })
})