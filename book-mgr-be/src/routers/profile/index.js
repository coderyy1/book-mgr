const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const { verify, getToken } = require('../../helpers/token');

const User = mongoose.model('User');

const router = new Router({
  prefix: '/profile'
});

// 修改密码的接口
router.post('/update/password', async (ctx) => {
  const {
    newPassword,
    oldPassword
  } = ctx.request.body;

  const payload = await verify(getToken(ctx));
  const { _id } = payload;

  const user = await User
    .findOne({
      _id
    }).exec();

  if(!user) {
    ctx.body = {
      code: 0,
      msg: '出错了'
    }

    return;
  }
  if(oldPassword !== user.password) {
    ctx.body = {
      code: 0,
      msg: '密码错误'
    }

    return;
  }

  user.password = newPassword;

  const res = await user.save();

  ctx.body = {
    code: 1,
    msg: '密码修改成功',
    data: res
  }
});




module.exports = router;