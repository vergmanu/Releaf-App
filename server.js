var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //ADDED
var passport = require('passport'); //ADDED
var methodOverride = require('method-override'); //ADDED

//OAUTH
require('dotenv').config();
require('./config/database');
require('./config/passport'); //ADDED

require('./config/database') //ADDED

var indexRouter = require('./routes/index'); 
var postsRouter = require('./routes/posts'); //ADDED
var commentsRouter = require('./routes/comments'); //ADDED

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method')); //ADDED
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
})); //ADDED
app.use(passport.initialize()); //ADDED
app.use(passport.session()); //ADDED

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
}); //ADDED


app.use('/', indexRouter);
app.use('/posts', postsRouter); //ADDED
app.use('/', commentsRouter); //ADDED

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
