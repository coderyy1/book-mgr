const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koaJwt = require('koa-jwt');

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if(err) {
        reject(err);
        return;
      }

      resolve(payload);
    })
  });
}

const getToken = (ctx) => {
  let { authorization } = ctx.header;

  return authorization.replace('Bearer ', '').replace('bearer ', '');
}

const middleware = (app) => {
  app.use(koaJwt({
    secret: config.JWT_SECRET
  }).unless({
    path: [
      /^\/auth\/login/,
      /^\/auth\/register/,
      /^\/character\/list/,
      /^\/book\/list/
    ]
  }));
}

module.exports = {
  verify,
  getToken,
  middleware
}