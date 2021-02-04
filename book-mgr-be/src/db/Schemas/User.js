const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers');

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  meta: getMate()
});

UserSchema.pre('save', preSave);

mongoose.model('User', UserSchema);
