const Koa = require('koa');
const koaBody = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors')


const app = new Koa();

connect().then(() => {
  app.use(cors());
  app.use(koaBody());
  registerRoutes(app);

  app.listen(3000, () => {
    console.log('启动成功!');
  });
})





// context => ctx ----- use => 中间件
// app.use((ctx) => {
//   const { path ='/' } = ctx;


  //通过path判断访问路径，使用body设置响应体内容 => 一种常用的写接口的方式
//   if (path === '/user/123') {
//     ctx.response.body = '返回用户123的信息'
//   }

//   if (path === '/settings') {
//     ctx.body = '返回一些设置信息'
//   }

// });

