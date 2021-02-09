const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const config = require('../../project.config');

const ForgetPassword = mongoose.model('ForgetPassword');
const User = mongoose.model('User');

const router = new Router({
  prefix: '/forget-password'
});

// 获取列表的接口
router.get('/list', async (ctx) => {
  let {
    page,
    size
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const list = await ForgetPassword
    .find({
      status: 1
    })
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await ForgetPassword
    .find({
      status: 1
    })
    .countDocuments()
    .exec();

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: list,
    total,
    page,
    size
  };
});



// 添加的接口
router.post('/add', async (ctx) => {
  const {
    account
  } = ctx.request.body;

  const oneUser = await User.findOne({
    account
  }).exec();

  if(!oneUser) {
    ctx.body = {
      code: 0,
      msg: '用户不存在',
      data: null
    };

    return;
  }

  const oneForget = await ForgetPassword.findOne({
    account,
    status: 1
  }).exec();

  if(oneForget) {
    ctx.body = {
      code: 0,
      msg: '已申请',
      data: null
    };

    return;
  }

  const forget = new ForgetPassword({
    account,
    status: 1
  });

  const res = await forget.save();

  ctx.body = {
    code: 1,
    msg: '申请成功',
    data: res
  };
});


// 修改状态的接口
router.post('/update/status', async (ctx) => {
  const {
    id,
    status
  } = ctx.request.body;

  const one = await ForgetPassword.findOne({
    _id: id,
    status: 1
  }).exec();

  if(!one) {
    ctx.body = {
      code: 1,
      msg: '完成'
    };

    return;
  }

  
  one.status = status;

  if(status === 2) {
    const user = await User.findOne({
      account: one.account
    }).exec();

    if(user) {
      user.password = config.DEFAULT_PASSWORD;
      await user.save();
    }
  }
  const res = await one.save();

  ctx.body = {
    code: 1,
    msg: '修改完成',
    data: res
  }


});




module.exports = router;