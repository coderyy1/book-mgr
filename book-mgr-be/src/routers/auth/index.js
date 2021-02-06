const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index')
const jwt = require('jsonwebtoken');
const config = require('../../project.config');

const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');

const router = new Router({
  prefix: '/auth'
});

// 注册的接口------------------------------------------------------------------------------------------
router.post('/register', async (ctx) => {

  const {
    account,
    password,
    inviteCode
  } = getBody(ctx);

  // 数据校验
  if(account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code : 0,
      msg: '字段不能为空',
      data: null
    };

    return;
  }

  if(password.length < 6 || password.length > 12) {
    ctx.body = {
      code : 0,
      msg: '密码长度为6~12位',
      data: null
    };

    return;
  }



  // 判断邀请码
  const findCode = await InviteCode.findOne({
    code: inviteCode
  }).exec();

  if((!findCode) || findCode.user) {
    ctx.body = {
      code : 0,
      msg: '验证码错误',
      data: null
    };

    return;
  }

  // 判断有无用户
  const findUser = await User.findOne({
    account
  }).exec();

  if(findUser) {
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

  // 成功保存到数据库后设定邀请码对应的user
  const res = await user.save();

  findCode.user = res._id;
  findCode.meta.updatedAt = new Date().getTime();
  await findCode.save();

  ctx.body = {
    code : 1,
    msg: '注册成功',
    data: res
  };
  
});

// 登陆的接口---------------------------------------------------------------------------------------------
router.post('/login', async (ctx) => {
  const {
    account,
    password
  } = getBody(ctx);

  if(account === '' || password === '') {
    ctx.body = {
      code : 0,
      msg: '字段不能为空',
      data: null
    };

    return;
  }

  const one = await User.findOne({
    account
  }).exec();

  if(!one) {
    ctx.body = {
      code : 0,
      msg: '用户名或密码错误',
      data: null
    };
    return;
  };

  const user = {
    account: one.account,
    _id: one._id,
    character: one.character
  }

  if(one.password === password) {
    ctx.body = {
      code : 1,
      msg: '登录成功',
      data: {
        user,
        token: jwt.sign(user, config.JWT_SECRET)
      }
    };

    return;
  }

  ctx.body = {
    code : 0,
    msg: '用户名或密码错误',
    data: null
  };

  
});

module.exports = router;