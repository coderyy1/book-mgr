const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers');

const LogSchema = new mongoose.Schema({
  user: {
    account: String,
    id: String
  },
  request: {
    method: String,
    url: String,
    body: String
  },

  meta: getMate()
});

LogSchema.pre('save', preSave);

mongoose.model('Log', LogSchema);