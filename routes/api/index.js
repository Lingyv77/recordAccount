const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const UserModel= require('../../models/UserModel');
const RecordModel = require('../../models/RecordModel');
const { checkToken } = require('../../middlewares/common');

// 登录
router.post('/login',  async (req, res) => {
  const { body: { account, password } } = req;

  if (!account) {
    res.status(412).json({
      code: 412,
      msg: '账号不能为空',
    });
    return null;
  } else if (!password) {
    res.status(412).json({
      code: 412,
      msg: '密码不能为空',
    });
    return null;
  }

  const userInfo = await UserModel.findOne({ account: account });

  if (!userInfo) {
    res.status(400).
    json({
      code: 400,
      msg: '用户未注册',
    });
    return null;
  }

  if (md5(password) === userInfo.password) {
    const token = jwt.sign({
      username: account,
      _id: userInfo._id
    }, process.env.TOKEN_KEY, {
      expiresIn: 7 * 24 * 60 * 60 //单位 s
    });
    res.json({
      code: 2001,
      msg: '登录成功',
      token
    });
  } else {
    res.status(400).json({
      code: 400,
      msg: '密码错误',
    });
  }
});

// 记录列表
router.get('/list', checkToken, async (req, res) => {
  const { query } = req;

  // queryParams 筛选条件
  const queryParams = {
    matter: new RegExp(query.matter || '')
  };

  if (query.number) {
    queryParams.number = { $lte: query.number }
  }

  try {
    console.log(req.tokenDecoded);
    const recordList = await RecordModel.find(queryParams).sort({ time: -1 });
    res.json( {
      code: 200,
      msg: '请求成功',
      data: recordList.map(item => ({
        id: item._id,
        matter: item.matter,
        time: moment(item.time).format('YYYY-MM-DD'),
        type: item.type,
        number: item.number,
        remark: item.remark
      }))
    })
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: '获取记录失败',
      err
    });
  }
});


module.exports = router;