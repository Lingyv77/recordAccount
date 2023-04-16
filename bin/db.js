/**
 *
 * @param success 连接成功回调
 * @param error 连接失败回调
 */
module.exports = function (success, error){

  const mongoose = require('mongoose');
  // mongodb服务
  mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SQL}`);

  // 连接 mongodb 数据库
  mongoose.connection.once('open', () => {
    console.log('mongodb链接成功');
    success();
  });

  mongoose.connection.on('error', () => {
    console.log('mongodb连接失败');
    error?.();
  });

  mongoose.connection.once('close', () => {
    console.log('mongodb断开连接');
  })
}
