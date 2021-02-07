const { verify, getToken } = require('../token');

const mongoose = require('mongoose');

const Log = mongoose.model('Log');

const logMiddleware = async (ctx, next) => {
  const startTime = Date.now();

  await next();

  let payload = {};
  try {
    payload = await verify(getToken(ctx));
  }catch(e) {
    payload = {
      account: '未知用户',
      id: ''
    }
  }

  const url = ctx.url;

  const log = new Log({
    user: {
      account: payload.account,
      id: payload._id
    },
    request: {
      url: url,
      body: '',
      method: ''
    }
  });

  const endTime = Date.now();

  await log.save();
};

module.exports = {
  logMiddleware
};