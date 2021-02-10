const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers');

const BookClassifySchema = new mongoose.Schema({
  title: String,

  meta: getMate()
});

BookClassifySchema.pre('save', preSave);

mongoose.model('BookClassify', BookClassifySchema);