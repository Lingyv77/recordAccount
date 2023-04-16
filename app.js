const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books/index');
const recordRouter = require('./routes/record/index');
const usersRouter = require('./routes/users/index');
const apiRouter = require('./routes/api/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 设置 session
app.use(session({
  name: 'sid', // 这是 cookie的name, 默认是: connect.sid
  secret: 'secretKey', // 设置参加加密, 密钥
  saveUninitialized: false, //是否每次请求都要设置cookie用来存储session的id
  resave: true, // 是否每次请求时重新保存session
  store: MongoStore.create({
    mongoUrl: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SQL}`
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 js 操作 document.cookie
    maxAge: 7 * 24 * 60 * 60 * 1000 // 单位 ms
  }
}));

// app.use('/', indexRouter);
app.use(usersRouter);
app.use('/book', booksRouter);
app.use('/record', recordRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
