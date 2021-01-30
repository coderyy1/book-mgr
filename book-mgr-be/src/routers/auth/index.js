const Router = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const router = new Router({
  prefix: '/auth'
});

// 注册的接口
router.post('/register', async (ctx) => {

  const {
    account,
    password
  } = ctx.request.body;

  // 判断有无用户
  const one = await User.findOne({
    account
  }).exec();

  if(one) {
    ctx.body = {
      code : 0,
      msg: '用户已存在',
      data: null
    };

    return;
  }

  const user = new User({
    account,
    password
  });

  const res = await user.save();

  ctx.body = {
    code : 1,
    msg: '注册成功',
    data: res
  };
  
});

// 登陆的接口
router.post('/login', async (ctx) => {
  ctx.body = '登陆成功';
});

module.exports = router;