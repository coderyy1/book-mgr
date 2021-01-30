const mongoose = require('mongoose');

// 哪个数据库
// 哪个集合
// 什么格式的文档

// Schema => 相当于Dao、JavaBean
// Modal => 根据Schema生成的一套方法，用于操作MongoDB下的集合和集合下的文档

const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number
});

const UserModal = mongoose.model('User', UserSchema);

const connect = () => {
  // 连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

  // 当数据库被打开时 做一些事
  mongoose.connection.on('open', () => {
    console.log('连接数据库成功!');

    // 通过modal创建文档(一条记录)
    const user = new UserModal({
      nickname: '小明',
      password: '123456',
      age: 12
    });

    // 直接使用modal修改
    user.age = 18

    // 通过save()保存，同步到MongoDB
    user.save();
  });
};

connect();