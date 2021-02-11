const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');

const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Log = mongoose.model('Log');

const router = new Router({
  prefix: '/dashboard'
});

// 获取数据=---------------------------------------------------------------------------------
router.get('/base-info', async (ctx) => {
  const bookTotal = await Book.countDocuments();
  const userTotal = await User.countDocuments();
  const logTotal = await Log.countDocuments();

  ctx.body = {
    code: 1,
    msg: '获取成功',
    data: {
      bookTotal,
      userTotal,
      logTotal
    }
  }
});




module.exports = router;