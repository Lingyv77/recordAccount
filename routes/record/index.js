const express = require('express');
const RecordModel = require('../../models/RecordModel');
const moment = require('moment');
const { checkLogin } = require('../../middlewares/common');

const router = express.Router();

router.use(checkLogin);

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/record/create');
});

// 添加记事本记录 页面
router.get('/create', (req, res) => {
  res.render('account/create', { addURL: '/record/add' });
});

// 查看记事本记录 页面
router.get('/list', async (req, res) => {
  const { query } = req;
  // queryParams 筛选条件
  const queryParams = {
    matter: new RegExp(query.matter || '')
  };
  if (query.number) {
    queryParams.number = { $lte: query.number }
  }
  try {
    const data = await RecordModel.find(queryParams).sort({ time: -1 });
    res.render('account/recordList', {
      form: query,
      deleteURL: '/record/delete',
      createURL: '/record/create',
      recordList: data.map(item => ({
        id: item._id,
        matter: item.matter,
        time: moment(item.time).format('YYYY-MM-DD'),
        type: item.type,
        number: item.number,
        remark: item.remark
      }))
    })
  } catch (err) {
    res.status(400).json({ message: '获取记录失败', err });
  }
});

// 添加记录
router.post('/add', async (req, res) => {
  try {
    await RecordModel.create({ ...req.body });
    res.render('account/success', { message: '添加成功了~', url: '/record/list' });
  } catch (err) {
    res.status(400).json({ message: '添加失败', err });
  }
});

// 修改记录 页面
router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RecordModel.findById(id);
    if (data?._doc) {
      res.render('account/editRecord', { editURL: '/record/edit',
        data: {
          ...data._doc,
          time: moment(data._doc.time) .format('YYYY-MM-DD')
        }
      });
    } else {
      res.status(400).json({ message: '未传递id'});
    }

  } catch (err) {
    res.status(400).json({ message: '跳转修改页面失败', err });
  }
});

// 修改记录
router.post('/edit', async (req, res) => {
  const { body } = req;
  if (body?._id) {
    try {
      await RecordModel.updateOne({ _id: body._id }, body);
      res.render('account/success', { message: '修改成功', url: '/record/list' });
    } catch (err) {
      res.status(400).json({ message: '修改失败', err});
    }
  } else {
    res.status(400).json({ message: '未传递_id'});
  }
});

// 删除记录
router.post('/delete',  async (req, res) => {
  // 获取 id
  const { id } = req.body;
  try {
    await RecordModel.deleteMany({ _id: id });
    res.json({ message: '删除成功', status: 200 });
  } catch (err) {
    res.status(400).json({ message: '删除失败', err });
  }
})

module.exports = router;
