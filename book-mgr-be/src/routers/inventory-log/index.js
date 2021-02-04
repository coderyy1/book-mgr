const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');

const InventoryLog = mongoose.model('InventoryLog');

const router = new Router({
  prefix: '/inventory-log'
});

// 查询=---------------------------------------------------------------------------------
router.get('/list', async (ctx) => {
  const {
    bid,
    type,
    size = 10,
    page
  } = ctx.query;

  // 按照插入数据库顺序倒序排序
  const list = await InventoryLog
    .find({
      bid,
      type
    })
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await InventoryLog
    .find({
      bid,
      type
    })
    .countDocuments()
    .exec();

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    list,
    total,
    page,
    size
  }
});



module.exports = router;