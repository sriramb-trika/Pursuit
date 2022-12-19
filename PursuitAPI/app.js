// All require goes here
createError = require('http-errors');
express = require('express');
path = require('path');
cookieParser = require('cookie-parser');
logger = require('morgan');
bodyParser = require('body-parser');
config = require('config');
mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
moment = require("moment");
fs = require('fs');
request = require('request');
admin = require('firebase-admin');
swaggerJSDoc = require('swagger-jsdoc');
utils = require('./common/utils');

let app = express();


let cors = require('cors')
app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));


let connStr = utils.getConectionString();
mongoose.set('useCreateIndex', true);
mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connecting to DB " + connStr + " failed"));
db.once('open', function () {
  console.log("** DATABASE CONNECTED TO - " + connStr + " **");
});


// Models
userModel = require('./models/userModel');
blackListModel = require('./models/blacklistModel');
positionModel = require('./models/positionModel');
skillModel = require('./models/skillModel');


// Routes

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let panelistsRouter = require('./routes/panelists');
let recruitersRouter = require('./routes/recruiters');
let positionsRouter = require('./routes/positions');
let skillsRouter = require('./routes/skills');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/panelists', panelistsRouter);
app.use('/recruiters', recruitersRouter);
app.use('/positions', positionsRouter);
app.use('/skills', skillsRouter);

// CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,client_id,client_secret,x-access-token, Authorization, time-zone');
  next();
});


// Swagger definition
let swaggerDefinition = {
  info: {
    title: 'Pursuit - API Swagger Definition',
    version: '1.0.0',
    description: 'Demonstration of Trika Pursuit Recruitment Portal API with Swagger',
  },
  host: config.project.url,
  basePath: '/',
};


// Options for the swagger docs
let options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


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


app.use('/asset', express.static(path.join(__dirname, 'asset')));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
