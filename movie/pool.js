const mysql=require('mysql');
//创建MySQL连接池
var pool=mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'',
  database:'movie',
  connectionLimit:20
});
//导出连接池
module.exports=pool;