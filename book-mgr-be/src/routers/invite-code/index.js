const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const { v4: uuidv4 } = require('uuid');

const InviteCode = mongoose.model('InviteCode');

const router = new Router({
  prefix: '/invite'
});

// 添加邀请码的接口------------------------------------------------------------------------------------
router.get('/add', async (ctx) => {
  let {
    count = 1
  } = ctx.request.query;

  count = Number(count);

  const arr = [];

  for(let i = 0; i < count; i ++) {
    arr.push({
      code: uuidv4(),
      user: ''
    });
  }

  const saved = await InviteCode.insertMany(arr);

  ctx.body = {
    code: 1,
    data: saved,
    msg: '创建成功'
  }
});

// 查询邀请码列表的接口---------------------------------------------------------------
router.get('/list', async (ctx) => {
  let {
    page,
    size
  } = ctx.request.query;

  page = Number(page);
  size = Number(size);

  const list = await InviteCode
    .find()
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await InviteCode
    .find()
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


// 删除邀请码的接口
router.delete('/delete/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = InviteCode.findOne({
    _id: id
  }).exec();

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '错误'
    };
    return;
  }

  const res = await InviteCode.deleteOne({
    _id: id
  });

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  };
});


module.exports = router;