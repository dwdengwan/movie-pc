//使用express构建web服务器 
const express = require('express');
//引入数据库模块
const pool = require("./pool");
/*引入路由模块*/

var app = express();

// 加载第三方模块:express-session
// 创建session对象 保存用户id
// const session=require("express-session");
// 对模块配置
// app.use(session({
//   secret:"128位随机字符串",//安全令牌
//   resave:false,           //每次请求是否需要保存
//   saveUninitialized:true, //初始化
//   cookie:{                //sessionid保存时
//     maxAge:1000*60*60*24  //1天
//   }
// }));
var server = app.listen(3000);

//跨域访问配置
//1.加载模块cors
 const cors=require("cors");
// 2.配置cors
 app.use(cors({
     //允许列表
     origin:["http://127.0.0.1:5500","http://localhost:5500"],
     //是否验证
     credentials:true
 }))

//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/

//http://127.0.0.1:3000/img/banner1.png
//express mysql 参数 request; response复习好好复习

//用户登录
// app.post("/login",(req,res)=>{
app.get("/login",(req,res)=>{
  // var uphone=req.body.uphone;
  // var upwd=req.body.upwd;
  var uphone=req.query.uphone;
  var upwd=req.query.upwd;
  var sql="select uphone,upwd from movie_user where uphone=? and upwd=?";
  pool.query(sql,[uphone,upwd],(err,result)=>{
    if(err)throw err;
    if(result.length>0){
      res.send({code:1,msg:"登录成功"});
    }else{
      res.send({code:-1,msg:"手机号或密码有误"});
    }
  })
})

//用户注册
app.get("/register",(req,res)=>{
  var uphone=req.query.uphone;
  var upwd=req.query.upwd;
  var uname=req.query.uname;
  // var sql="select uname,uphone from movie_user uname=? or uphone=?";
  var sql="insert into movie_user values (null,?,?,?)";
  pool.query(sql,[uphone,upwd,uname],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"注册成功"})
    }else{
      res.send({code:-1,msg:"注册失败"})
    }
    console.log(result);
  })
})

//验证用户是否被注册
app.get("/isRegister",(req,res)=>{
  var uname=req.query.uname;
  var sql="select uname from movie_user where uname=?";
  pool.query(sql,[uname],(err,result)=>{
    if(err)throw err;
    if(result.length>0){
      res.send({code:-1,msg:"用户名已被注册"});
    }
    console.log(result.length);
  })
})

//验证手机号是否被注册
app.get("/isRegister1",(req,res)=>{
  var uphone=req.query.uphone;
  var sql="select uphone from movie_user where uphone=?";
  pool.query(sql,[uphone],(err,result)=>{
    if(err)throw err;
    if(result.length>0){
      res.send({code:-1,msg:"手机号已被注册"});
    }
    console.log(result);
    console.log(result.length);
  })
})

//index首页
// 轮播图 move_lunbo
app.get("/getLunbo",(req,res)=>{
  var sql="select * from move_lunbo";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
//#一楼列表 movie_oFList
app.get("/getOFList",(req,res)=>{
  var sql="select * from movie_oFList";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
});
// 二楼 热播影视 movie_rbys
app.get("/getRbys",(req,res)=>{
  var sql="select * from movie_rbys";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
});
//三楼 电视节目 movie_dsjm
app.get("/getDsjm",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno) pno=1;
  if(!pageSize)pageSize=6;
  var progress=0;
  var sql1="select count(id) as c from movie_dsjm";
  obj = {code:1};
  pool.query(sql1,(err,result)=>{
       if(err)throw err;
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT * FROM movie_dsjm LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
})

// 四楼 电视剧排行榜 movie_rank
app.get("/getRank",(req,res)=>{
  var sql="select * from movie_rank";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

//今日影视页面
//jrys_rbys 今日影视 的热播影视列表
app.get("/getRbys1",(req,res)=>{
  var sql="select * from jrys_rbys";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})

//带参数的跳转页面
app.get("/getId",(req,res)=>{
  var id=req.query.id;
  console.log(id);
  var sql="select * from jrys_left where id=?";
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

//从搜索框获取内容 去往dsj_left查询
app.get("/getKeyword",(req,res)=>{
  var keyword=req.query.keyword;
  console.log(keyword);
  var sql=`select * from dsj_left where title like ? or uname like ? or auther like ?`;
  // var sql="select * from dsj_left where title like ?";
  pool.query(sql,[keyword,keyword,keyword],(err,result)=>{
    if(err)throw err;
    console.log(result);
    res.send(result);
  })
})

//今日影视 的左则列表 jrys_left
app.get("/getLeft",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno){
    pno=1;
  }
  if(!pageSize){
    pageSize=10;
  }
  var sql = "SELECT count(id) as c FROM jrys_left";
    var progress = 0; //sql执行进度
    obj = {code:1};
    pool.query(sql,(err,result)=>{
         if(err)throw err;
         var pageCount = Math.ceil(result[0].c/pageSize);
         obj.pageCount = pageCount;
         progress += 50;
         if(progress == 100){
          res.send(obj);
         }
    });
    //  查询当前页内容
  var sql=" SELECT * FROM jrys_left LIMIT ?,?"
  var offset = parseInt((pno-1)*pageSize);
  pageSize = parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
      if(err)throw err;
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
    }); 
  })

// 电影票房
// 电影票房 柱形表 dypf_pillar
app.get("/getPillar",(req,res)=>{
  var sql="select * from dypf_pillar";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
});

// 电影票房 表格表 dypf_table
app.get("/getDypfTable",(req,res)=>{
  var sql="select * from dypf_table";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})

//热映影视 ryys_list
app.get("/getRyys",(req,res)=>{
  var sql="select * from ryys_list";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})

//今日影视 的左则列表 dsj_left
app.get("/getDsj",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno){
    pno=1;
  }
  if(!pageSize){
    pageSize=10;
  }
  var sql = "SELECT count(id) as c FROM dsj_left";
    var progress = 0; //sql执行进度
    obj = {code:1};
    pool.query(sql,(err,result)=>{
         if(err)throw err;
         var pageCount = Math.ceil(result[0].c/pageSize);
         obj.pageCount = pageCount;
         progress += 50;
         if(progress == 100){
          res.send(obj);
         }
    });
    //  查询当前页内容
  var sql=" SELECT * FROM dsj_left LIMIT ?,?"
  var offset = parseInt((pno-1)*pageSize);
  pageSize = parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
      if(err)throw err;
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
    }); 
  })