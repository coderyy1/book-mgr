const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers');

const CharacterSchema = new mongoose.Schema({
  name: String,  //member   admin
  title: String,  //成员    管理员
  power: Object,


  meta: getMate()
});

CharacterSchema.pre('save', preSave);

mongoose.model('Character', CharacterSchema);