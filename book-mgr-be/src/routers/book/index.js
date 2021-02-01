const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');

const Book = mongoose.model('Book');

const router = new Router({
  prefix: '/book'
});

// 添加书籍的接口
router.post('/add', async (ctx) => {
  const {
    name,
    author,
    classify,
    price,
    publishDate
  } = getBody(ctx);

  const book = new Book({
    name,
    author,
    classify,
    price,
    publishDate
  });

  const res = await book.save();

  ctx.body = {
    code: 1,
    msg: '书籍添加成功',
    data: res
  };
  
});

// 获取全部书籍列表的接口
router.get('/list', async (ctx) => {
  const list = await Book.find().exec();

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: list
  };
});


module.exports = router;