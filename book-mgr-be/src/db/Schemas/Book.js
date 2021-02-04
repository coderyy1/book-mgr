const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers');

const BookSchema = new mongoose.Schema({
  // 书名
  name: String,
  // 作者
  author: String,
  // 分类
  classify: String,
  // 价格
  price: Number,
  // 出版日期
  publishDate: String,
  // 库存
  count: Number,

  meta: getMate()
});

BookSchema.pre('save', preSave);

mongoose.model('Book', BookSchema);