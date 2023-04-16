const mongoose = require('mongoose');

// 设置文档属性及对应值
const UserSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

// 创建对象模型
const userModel = mongoose.model('users', UserSchema);

module.exports = userModel;