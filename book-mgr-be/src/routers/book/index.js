const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');

// 常量==========================================================================================
// 用于判断出库还是入库的常量
const BOOK_CONST = {
  IN: 'IN_COUNT',
  OUT: 'OUT_COUNT'
};

const Book = mongoose.model('Book');
const InventoryLog = mongoose.model('InventoryLog');

const findBookOne = async (id) => {
  const one = await Book.findOne({
    _id: id
  }).exec();

  return one;
}

const router = new Router({
  prefix: '/book'
});

// 接口=============================================================================================
// 添加书籍的接口-------------------------------------------------------------------------------------
router.post('/add', async (ctx) => {
  const {
    name,
    author,
    classify,
    price,
    publishDate,
    count
  } = getBody(ctx);

  // 校验
  if(name === '' ||
    author === '' ||
    classify === '' ||
    price === '' ||
    publishDate === '' ||
    count === '') {
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
    publishDate,
    count
  });

  const res = await book.save();

  ctx.body = {
    code: 1,
    msg: '书籍添加成功',
    data: res
  };
  
});

// 查询书籍列表的接口----------------------------------------------------------------------------------
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

  const total = await Book.find(query).countDocuments();

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

// 删除书籍的接口----------------------------------------------------------------------------------------
router.delete('/deleteBook/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await findBookOne(id);
  if(!one) {
    ctx.body = {
      code: 0,
      msg: '没有该书籍',
      data: null
    };

    return;
  }

  const res = await Book.deleteOne({
    _id: id
  });

  ctx.body = {
    code: 1,
    msg: '书籍删除成功',
    data: res
  };
})

// 入库出库操作的接口----------------------------------------------------------------------------------
router.post('/update/count', async (ctx) => {
  const {
    id,
    type
  } = getBody(ctx);

  let {
    num
  } = getBody(ctx);

  num = Number(num);

  const book = await findBookOne(id);

  // 没有该书籍
  if(!book) {
    ctx.body = {
      code: 0,
      msg: '没有该书籍',
      data: null
    };

    return;
  }

  if(type === BOOK_CONST.OUT) {
    // 出库
    num = -Math.abs(num);
  }else {
    // 入库
    num = Math.abs(num);
  }

  book.count = book.count + num;
  if(book.count < 0) {
    ctx.body = {
      code: 0,
      msg: '出库失败，书本数量不足',
      data: null
    };

    return;
  }

  const res = await book.save();

  const log = new InventoryLog({
    bid: id,
    type,
    num: Math.abs(num),
    user: ''
  });

  log.save();

  ctx.body = {
    code: 1,
    msg: '操作成功',
    data: res
  }

});

// 书籍修改的接口--------------------------------------------------------------------------------------
router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = getBody(ctx);

  const one = await findBookOne(id);

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '没有该书籍',
      data: null
    };
    return;
  }

  // 利用对象合并 + es6的rest语法完成修改
  const newObj = {};
  // entries => 创建可迭代对象
  Object.entries(others).forEach(([key, value]) => {
    if(value) {
      newObj[key] = value;

    }
  });

  Object.assign(one, newObj);


  const res = await one.save();

  ctx.body = {
    code: 1,
    msg: '修改成功',
    data: res
  };

});

// 书籍详情页面接口---------------------------------------------------------------------------------------

router.get('/detail/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await findBookOne(id);
  if(!one) {
    ctx.body = {
      code: 0,
      msg: '书籍不存在',
      data: null
    }

    return;
  }

  ctx.body = {
    code: 1,
    msg: '成功找到该书籍',
    data: one
  };

});


module.exports = router;