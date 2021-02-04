const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers');

const InventoryLogSchema = new mongoose.Schema({
  bid: String,
  type: String,
  num: Number,
  user: String,

  meta: getMate()
});

InventoryLogSchema.pre('save', preSave)

mongoose.model('InventoryLog', InventoryLogSchema);