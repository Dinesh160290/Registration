$(document).ready(function(){
  $('#update').on('submit', function(){
      

      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/update',
        data: $('#update').serialize(),
        success: function(data){
          if(data.seq != 0)
          {
            location.href = "/todo";
          }
        }
      });

      return false;

  });
/*
  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });
*/


  $('.edit_record').on('click',function(){
      var id = this.id;
      window.location.href = '/todo/' + id + '/' + 'UPDATE';
  });

  $('.delete_record').on('click', function() {

    if(confirm("Are you sure want to delete?"))
    {
      var id = this.id;
      $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: '/todo/' + id,
        data:{'id':id},
        success: function(data){
          if(data.seq != 0)
          {
            location.href = '/todo';
          }
        }
      });
    }
  });










});
