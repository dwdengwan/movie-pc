const express=require('express');
const userRouter=require('./routes/user.js');
// const pro=require('./routes/pro.js');
// const demo=require('./routes/demo.js');
const bodyParser=require('body-parser');
var app=express();
app.listen(3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended:false 
}));
app.use('/user',userRouter);
// app.use('/demo',demo);
// app.use('/pro',pro);
// /img/index/shoppicpath1501209373.jpg
app.get("/lunbo",(req,res)=>{
  var rows=[
    {id:1,img_url:"http://127.0.0.1/img/index/shoppicpath1501209373.jpg"},
    {id:2,img_url:"http://127.0.0.1/img/index/shoppicpath1543286172.jpg"},
    {id:3,img_url:"http://127.0.0.1/img/index/shoppicpath1544509744.jpg"},
    {id:4,img_url:"http://127.0.0.1/img/index/shoppicpath1544509744.jpg"}
];
res.send(rows);
})
