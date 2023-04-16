const mongoose = require('mongoose');

// 设置文档属性及对应值
const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  is_hot: Boolean,
});

// 创建对象模型
const BookModel = mongoose.model('books', BookSchema);

module.exports = BookModel;