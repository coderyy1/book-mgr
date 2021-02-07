const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');

const Log = mongoose.model('Log');

const router = new Router({
  prefix: '/log'
});

// 获取日志列表
router.get('/list', async (ctx) => {
  let {
    page,
    size
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const list = await Log
    .find()
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Log
    .find()
    .countDocuments()
    .exec();

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: list,
    page,
    total
  };
});



module.exports = router;