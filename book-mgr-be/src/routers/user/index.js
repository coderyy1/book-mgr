const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const config = require('../../project.config');

const User = mongoose.model('User');

const router = new Router({
  prefix: '/user'
});

// 查询用户列表的接口-------------------------------------------------
router.get('/list', async (ctx) => {
  let {
    keyword = '',
    page = 1,
    size = 10
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const query = {};
  
  if(keyword) {
    query.account = keyword;
  }

  const list = await User
    .find(query)
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await User
    .find(query)
    .countDocuments()
    .exec();

  ctx.body = {
    code: 1,
    msg: '查询成功',
    list,
    total,
    page,
    size
  };

});

// 删除用户的接口---------------------------------------------------
router.delete('/delete/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await User.findOne({
    _id: id
  }).exec();

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '未找到该用户',
      data: null
    };

    return;
  }

  const res = await User.deleteOne({
    _id: id
  }).exec();

  ctx.body = {
    code: 1,
    msg: '用户删除成功',
    data: res
  };
});


// 添加用户的接口
router.post('/add', async (ctx) => {
  const {
    account,
    password
  } = getBody(ctx);

  // 校验
  if(account === '' || 
    password === '' ||
    password.length < 6 ||
    password.length > 12) {
      ctx.body = {
        code: 0,
        msg: '非法参数',
        data: null
      };

      return;
    }

  // 是否存在
  const one = await User.findOne({
    account
  }).exec();
  if(one) {
    ctx.body = {
      code: 0,
      msg: '用户已存在',
      data: null
    };

    return;
  }

  // 创建
  const user = new User({
    account,
    password
  });

  const res = await user.save();

  ctx.body = {
    code: 1,
    msg: '创建用户成功',
    data: res
  };
});


// 重置密码的接口
router.post('/reset/password', async (ctx) => {
  const {
    id
  } = getBody(ctx);

  const one = await User.findOne({
    _id: id
  }).exec();

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '未找到该用户',
      data: null
    };

    return;
  }

  one.password = config.DEFAULT_PASSWORD;
  const res = await one.save();

  ctx.body = {
    code: 1,
    msg: '密码重置成功',
    data: {
      account: res.account,
      _id: res._id
    }
  };
});

module.exports = router;