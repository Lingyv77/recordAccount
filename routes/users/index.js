const express = require('express');
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

const router = express.Router();

// 首页
router.get('/', (req, res) => {
  res.redirect('/record/list');
});

// 注册 页面
router.get('/reg', (req, res) => {
  res.render('users/reg');
});

// 注册
router.post('/reg', async (req, res) => {
  const { body } = req;
  if (!body.account) {
    res.status(412).
    render('account/error', { message: '请输入账号, 返回重新注册', url: '/reg' });
    return null;
  } else if (!body.password) {
    res.status(412).
    render('account/error', { message: '请输入密码, 返回重新注册', url: '/reg' });
    return null;
  }

  const userInfo = await UserModel.findOne({ account: body.account });
  if (userInfo) {
    res.status(400).send(`<h1>注册失败, 用户已存在</h1>`);
  } else {
    await UserModel.create({
      account: body.account,
      password: md5(body.password)
    });
    res.render('account/success', { message: '注册成功', url: '/login' });
  }
});

// 登录 页面
router.get('/login', (req, res) => {
  res.render('users/login');
});

// 登录
router.post('/login',  async (req, res) => {
  const { body: { account, password } } = req;

  if (!account) {
    res.status(412).
    render('account/error', { message: '账号, 返回重新登录', url: '/login' });
    return null;
  } else if (!password) {
    res.status(412).
    render('account/error', { message: '请输入密码, 返回重新登录', url: '/login' });
    return null;
  }

  const userInfo = await UserModel.findOne({ account: account });

  if (!userInfo) {
    res.status(400).
    render('account/error', { message: '用户未注册, 前往注册', url: '/reg' });
    return null;
  }

  if (md5(password) === userInfo.password) {
    req.session.username = account;
    req.session._id = userInfo._id;
    res.render('account/success', { message: '登录成功, 查看笔记', url: '/record/list' });
  } else {
    res.status(400).
    render('account/error', { message: '密码错误, 重新登录', url: '/login' });
  }
});

// 退出登录
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('account/success', { message: '退出成功, 前往登录', url: '/login' });
  });
});

// // 查看 session
// router.get('/cart', (req, res) => {
//   if (req.session.username) {
//     res.send('购物');
//   } else {
//     res.status(403).send(`<h1>请前往登录</h1>`);
//   }
// });

module.exports = router;