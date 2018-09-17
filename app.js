var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var hbs = require('express-handlebars');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

//connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sanime',{ useNewUrlParser: true }).then(
  () => console.log('ket noi thanh cong'),
  err => console.log('ket noi that bai') 
);

// view engine setup
var hbsConfig = hbs.create({
  layoutsDir: path.join(__dirname, './views/layouts'),
  defaultLayout: path.join(__dirname, './views/layouts/layout'),
  partialsDir: path.join(__dirname, './views/common'),
  extname: '.hbs'
});

app.engine('.hbs',hbsConfig.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//router
app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
