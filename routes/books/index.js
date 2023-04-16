const express = require('express');
const router = express.Router();
const BookModel = require('../../models/BookModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// const books = [
//   {
//     name: '三体',
//     author: '刘慈欣',
//     price: 25.5,
//     is_hot: true,
//   },
//   {
//     name: '三国演义',
//     author: '罗贯中',
//     price: 45,
//     is_hot: false,
//   },
//   {
//     name: '秋园',
//     author: '杨本芬',
//     price: 19,
//     is_hot: false,
//   },
//   {
//     name: '活着',
//     author: '余华',
//     price: 20,
//     is_hot: true,
//   },
//   {
//     name: '红楼梦',
//     author: '曹雪清',
//     price: 36.2,
//     is_hot: false,
//   },
//   {
//     name: '狂飙',
//     author: '徐纪周',
//     price: 48.8,
//     is_hot: true,
//   },
//   {
//     name: '在细雨中呼喊',
//     author: '余华',
//     price: 15.2,
//     is_hot: true,
//   },
// ];

// books.forEach(book => {
//   BookModel.create(book);
// });


// // create 新增
// BookModel.create({name: '三体', is_hot: false }).then(data => {
//   console.log(data);
// });

// //deleteMany / deleteOne 删除
// BookModel.deleteMany({ name: '三体' }).then(res => {
//   console.log(res);
// });

// //find / findOne 查询
// BookModel.findOne({ name: '三体' }).then(res => {
//   console.log(res);
// });

/**
 * 运算符号
 * > 使用 $gt
 * < 使用 $lt
 * >= 使用 $gte
 * <= 使用 $lte
 * > 使用 $gt
 * !== 使用 $ne
 *
 * 逻辑运算
 * $or 逻辑或
 * BookModel.find({ $or: [{ price: 18 }, { price: 30 }] })
 * $and 逻辑且
 * BookModel.find({ $and: [{ price: { $lt: 20 } }, { price: { $gt: 18 } }] })
 *
 * 正则必配
 * /regexp/ new Regexp('regexp')
 * BookModel.find(new Regexp('regexp'));
 */
// BookModel.find({ $and: [{price: { $lt: 30 }}, { price: { $gt: 18 } }] })
//   .then(res => {
//   console.log(res.map(book => book.name));
// });
// BookModel.find({ name: new RegExp('三') })
//   .then(res => {
//   console.log(res.map(book => book.name));
// });
//
// /**
//  * 个性化读取
//  */
// // 选择获取字段 _id会默认携带 设置 _id: 0
// BookModel.find()
//   .select({ name: 1, author: 1, _id: 0 })
//   .then(res => {
//   console.log(res);
// });
//
// // 数据排序 倒序: -1, 升序: 1
// BookModel.find()
//   .select({ _id: 0, name: 1, price: 1 })
//   .sort({ price: -1 })
//   .then(res => {
//   console.log(res);
// });
//
// // 数据截取 skip: 跳过, limit: 限定
// BookModel.find()
//   .select({ _id: 0, name: 1, price: 1 })
//   .sort({ price: -1 })
//   .skip(1)
//   .limit(3)
//   .then(res => {
//   console.log(res);
// });


module.exports = router;
