const Koa = require('koa');

const app = new Koa();

// context => ctx ----- use => 中间件
app.use((ctx) => {
  const { path ='/' } = ctx;


  //通过path判断访问路径，使用body设置响应体内容 => 一种常用的写接口的方式
  if (path === '/user/123') {
    ctx.response.body = '返回用户123的信息'
  }

  if (path === '/settings') {
    ctx.body = '返回一些设置信息'
  }

});

app.listen(3000, () => {
  console.log('启动成功!');
});