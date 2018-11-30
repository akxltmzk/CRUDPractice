$(function () {
  // click
  $('#create').on('click',(event)=>{GoCreatePage()})

  $('.update-topic-form').click(function(){
    $('.editable').removeAttr('disabled');
  })

  $('#update').on('click',()=>{
    let id = $('#topicId').val();
    let title = $('#title').val();
    let description = $('#description').val();

    $.ajax({
      type: "PUT",
      url: '/topic/update/'+id,
      data: {
        title: title,
        description: description
      },
      success: function(res){
        $('.editable').attr('disabled', 'disabled');
        $('.menu-link[data-id='+id+']').html(res);
      },
    });
  })

  $('#delete').on('click',()=>{
    let id = $('#topicId').val();

    $.ajax({
      type: "DELETE",
      url: '/topic/delete/'+id,
      data: {},
      success: function(res){
        if(res == 'success'){   
          location.href = '/';
        }
      },
    });
  })
})

function GoCreatePage()
{ window.location.href='/topic/create';}

