const auth = require('./auth/index');
const inviteCode = require('./invite-code/index');
const book  = require('./book/index');
const inventoryLog  = require('./inventory-log/index');
const user = require('./user/index');
const character = require('./character/index');
const log = require('./log/index');
const forgetPassword = require('./forgetpassword/index');
const bookClassify = require('./book-classify/index');
const profile = require('./profile/index');

module.exports = (app) => {
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(book.routes());
  app.use(inventoryLog.routes());
  app.use(user.routes());
  app.use(character.routes());
  app.use(log.routes());
  app.use(forgetPassword.routes());
  app.use(bookClassify.routes());
  app.use(profile.routes());
};