const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const InviteCodeSchema = new mongoose.Schema({
  code: String,
  user: String,

  meta: getMate()
});

mongoose.model('InviteCode', InviteCodeSchema);
