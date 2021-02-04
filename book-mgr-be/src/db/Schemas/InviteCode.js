const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers');

const InviteCodeSchema = new mongoose.Schema({
  code: String,
  user: String,

  meta: getMate()
});

InviteCodeSchema.pre('save', preSave);

mongoose.model('InviteCode', InviteCodeSchema);
