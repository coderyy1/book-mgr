require('./Schemas/User');
require('./Schemas/InviteCode');
require('./Schemas/Book');
const mongoose = require('mongoose');

const connect = () => {
  return new Promise((resolve) => {
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

    // 当数据库被打开时 做一些事
    mongoose.connection.on('open', () => {
      console.log('连接数据库成功!');

      resolve();
    });
  });
};

module.exports = {
  connect
};