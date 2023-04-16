const express = require('express');
const formidable = require('formidable');

const router = express.Router();

// 导入lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);

// 导入shortid
const shortid = require('shortid');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// 显示网页表单
router.get('/portrait', (req, res) => {
  res.render('portrait');
});

// 处理文件上传
router.post('/portrait/upload', (req, res, next) => {
  // 创建 form 对象
  const form = formidable({
    multiple: true,
    // 设置上传文件的保存目录
    uploadDir: __dirname + '/../public/images',
    // 保持文件后缀
    keepExtensions: true
  });

  // 解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return null;
    }
    // console.log(fields); // text radio checkbox select
    // console.log(files); // file

    // 服务器保存该图片 URL, 将来保存数据库中
    const url = '/images/' + files.portrait.newFilename;
    res.send(url);
  });
});

// 查看记事本记录 页面
router.get('/account/list', (req, res) => {
  const recordList = db.get('account').value();
  res.render('account/recordList', {
    recordList,
    deleteURL: '/account/delete',
    createURL: '/account/create',
  });
});

// 添加记事本记录 页面
router.get('/account/create', (req, res) => {
  res.render('account/create', { addURL: '/account/add' });
});

// 添加记录
router.post('/account/add', (req, res) => {
  // 生成 id
  const id = shortid.generate();
  db.get('account').unshift({ ...req.body, id }).write();
  res.render('account/success', { message: '添加成功了~', url: '/account/list' });
})

// 删除记录
router.post('/account/delete',  (req, res) => {
  // 获取 id
  const { id } = req.body;
  // 删除记录
  db.get('account').remove({ id }).write();
  res.json({
    message: '删除成功',
    status: 200
  });
});

// 设置cookie
router.get('/setCookie', (req, res) => {
  /**
   * cookie 没有设置时间及为会话生命
   * maxAge 生命期限 ms
   */
  res.cookie('test-key', 'test-value1212', { maxAge: 60 * 1000 });
  res.cookie('name', 'SRR-SEO', { maxAge:  24 * 60 * 60 * 1000 });
  res.send('set-cookie');
});

// 获取cookie
router.get('/getCookie', (req, res) => {
  res.json(req.cookies);
});

// 删除cookie
router.get('/clearCookie', (req, res) => {
  res.clearCookie('name');
  res.send('clear-cookie');
});

module.exports = router;
