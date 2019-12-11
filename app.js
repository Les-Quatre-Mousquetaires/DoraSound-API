var createError = require('http-errors');
var express = require('express');
var socket_io = require('socket.io');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

require('./db/database');
var accesscontrol = require('./app/helpers/accesscontrol');

require('./app/middleware/passport');

var apiRouter = require('./routes/api');
var authRouter = require('./routes/auth');

var app = express();

var io = socket_io();
app.io = io;

global.appRoot = path.resolve(__dirname);

// view engine setup -> changed to app/views
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//CORS tham khảo tại https://topdev.vn/blog/cors-la-gi/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.disable('x-powered-by');

accesscontrol();

app.use('/api', apiRouter);
app.use('/auth', authRouter);
var socketRouter = require('./routes/socket')(io);
app.use('/', socketRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  let msg = err.errmsg || err.message;
  res.json({ message: msg });
});

module.exports = app;
