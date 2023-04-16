const jwt = require("jsonwebtoken");

// 检测登录
function checkLogin(req, res, next) {
  if (!req.session.username) {
    return res.render('account/error', { message: '请前往登录', url: '/login' });
  }
  next();
}

// 检测 token 及校验
function checkToken(req, res, next) {
  const token = req.get('token');

  if (!token) {
    return res.status(400).json({
      code: 4001,
      msg: 'token 缺失'
    });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(400).json({
        code: 4002,
        msg: 'token 校验失败',
        err
      })
    }
    req.tokenDecoded = data;
    next();
  });
}

module.exports = {
  checkLogin,
  checkToken
}