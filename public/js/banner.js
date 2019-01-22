if(typeof jQuery!=="function"){
    throw new Error("请先引入jQuery")
}
$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/getLunbo",
        type:'get',
        dataType:'json'
    }).then(res=>{
        // console.log(res);
        var html="";
        for(var p of res){
            html+=`<img src="${p.img_url}">`
        }
        $("#slider .tup").html(html);
        $("#slider .tup>img:first-child").addClass("active");
        var html="";
        html+="<li></li>".repeat(res.length);//.repeat(res.length)追加4个li至html片段中
        $("#carsel").html(html);//把html片段追加至#carsel中
        $("#carsel>li:first-child").addClass("active");
        var interval=5000,timer=null,index=0;
        var $imglist=$("#slider>.tup>img");
        var $lilist=$("#carsel>li");
        function trans(){
            $imglist.eq(index).addClass("active").siblings().removeClass("active");
            $lilist.eq(index).addClass("active").siblings().removeClass("active");
        }
        function lunbo(){
            if(index<$imglist.length)
            index++;
            else index=0;
          trans();
        }
        timer=setInterval(lunbo, interval);
        $("#slider").hover(
            function(){
                clearInterval(timer);
                timer=null;
            },
            function(){
                timer=setInterval(lunbo,interval)
            }
        )
        $("#carsel").on("mouseover","li",(e)=>{
            var tar=$(e.target);
            console.log(tar.index());
            index=tar.index();
           trans();
        })
        $(".prev_pic").click(function(){
            (index==0)&&(index=res.length);
            if(index>0){
                index--;
               trans();
            }
        })
        $(".next_pic").click(function(){
            index++;
            (index==res.length)&&(index=0);
           trans();
        })
    })
})