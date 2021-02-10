const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');

const BookClassify = mongoose.model('BookClassify');

const router = new Router({
  prefix: '/book-classify'
});

// 获取列表的接口
router.get('/list', async (ctx) => {
  const list = await BookClassify.find().sort({_id : -1}).exec();

  ctx.body = {
    code: 1,
    data: list,
    msg: '获取列表成功'
  }
});

// 添加分类的接口
router.post('/add', async (ctx) => {
  const {
    title
  } = ctx.request.body;

  const one = await BookClassify.findOne({
    title
  }).exec();
  if(one) {
    ctx.body = {
      code: 0,
      msg: '出错了'
    };
    return;
  }

  const classify = new BookClassify({
    title
  });

  const res = await classify.save();

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res
  }
});


// 删除分类的接口
router.delete('/delete/:id', async (ctx) => {
  const {
    id
  } = ctx.params;
  const one = await BookClassify.findOne({
    _id: id
  }).exec();

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '出错了'
    };

    return;
  }

  const res = await BookClassify.deleteOne({
    _id: id
  }).exec();

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }
});

// 修改分类的接口
router.post('/update', async (ctx) => {
  const {
    id,
    title
  } = ctx.request.body;

  const one = await BookClassify.findOne({
    _id: id
  });

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '出错了'
    }

    return;
  }

  one.title = title;
  const res = await one.save();

  ctx.body = {
    code: 1,
    msg: '修改成功',
    data: res
  }
});



module.exports = router;