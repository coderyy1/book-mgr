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

  // 校验
  if(name === '' ||
    author === '' ||
    classify === '' ||
    price === '' ||
    publishDate === '') {
      ctx.body = {
        code: 0,
        msg: '添加失败',
        data: null
      };
      
      return;
    }

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

  // 分页查询的参数
  const {
    page = 1,
    size = 10,
    keyword = ''
  } = ctx.query;

  const query = {};
  if(keyword) {
    query.name = keyword
  }

  const list = await Book
    .find(query)
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Book.find(query).count();

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      total,
      list,
      page,
      size
    }
  };
});


module.exports = router;