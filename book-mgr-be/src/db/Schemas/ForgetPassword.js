const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers');

const ForgetPasswordSchema = new mongoose.Schema({
  account: String,
  // 1 待处理
  // 2 已重置
  // 3 已忽略
  status: Number,

  meta: getMate()
});

ForgetPasswordSchema.pre('save', preSave);

mongoose.model('ForgetPassword', ForgetPasswordSchema);
