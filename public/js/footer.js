$(function(){
    $.ajax({
      url:"http://127.0.0.1:5500/movie_footer.html",
      type:"get",
      success:function(res){
        $("<link rel='stylesheet' href='css/movie_footer.css'>").appendTo("head");
        $(res)
        .replaceAll("#footer");
      }
    })
  })