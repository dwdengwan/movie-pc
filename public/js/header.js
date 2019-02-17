$(function(){
    $.ajax({
      url:"http://127.0.0.1:5500/movie_header.html",
      type:"get",
      success:function(res){
        //动态添加<link>到<head>元素中，自动引入header.css
        $("<link rel='stylesheet' href='css/movie_header.css'>").appendTo("head");
        //用接收到的片段代替页面上空的<header>
        $(res)//<header>
        .replaceAll("#header");
        var day=document.getElementById("day");
        //倒计时
        var daojs=function(){
        var time=new Date().getTime();//现在时间
        //过年时间
        var time0=new Date("2019/02/19 00:00:00").getTime();
        var time1=time0-time;//相差的千毫秒数
        var d=parseInt(time1/1000/3600/24);//天
        var num=time1-d*1000*3600*24;
        var h=parseInt(num/1000/3600);//小时
        var num1=num-h*1000*3600;
        var min=parseInt(num1/1000/60);//分钟
        var num2=num1-min*1000*60;
        var s=parseInt(num2/1000);//秒钟
        if(h<10)h="0"+h;
        if(min<10)min="0"+min;
        if(s<10)s="0"+s;
        day.innerHTML=`距2019年元宵节还有${d}天${h}小时${min}分钟${s}秒钟！！！`;
      }
      setInterval(daojs,1000);
        //获得搜索框
        var $input=$("#ipt");
        // 获得查询按钮
        var $btnSearch=$("#ss");
        $btnSearch.click(function(){//单击查询按钮
          //如果搜索框中有内容，且不是空字符时
          if($input.val().trim().length>0)
          //就携带搜索框的内容到products.html中
            // location.href="movie_list.html?keyword="+$input.val();
            location.href="movie_details.html?keyword="+$input.val();
        });
        // 当在搜索框上按下键盘时
        $input.keyup(function(e){
          if(e.keyCode==13){//如果按的是回车键
            //就调用查询按钮的处理函数
            $btnSearch.click();
          }
        })
        // 如果地址栏中有kwords，
        if(location.search.indexOf("keyword")!=-1){
          $input.val(//就读取kwords内容,放入搜索框
            decodeURI(//将编码后的字符串解码为原文
              location.search.split("=")[1]
            )
          );
        }
      }
    })
  })