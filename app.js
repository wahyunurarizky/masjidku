const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');

const userRouter = require('./routes/userRoutes');
const masjidRouter = require('./routes/masjidRoutes');
const adminViewRouter = require('./routes/adminViewRoutes');
const mainViewRouter = require('./routes/mainViewRoutes');

// const doaJson = require('./doa.json');

// *****************************declare app**************************
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// set security http headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
    },
  })
);

// preventing dos and bruteforce dengan rate lmiting
const limiter = rateLimit({
  max: 100, //100 request
  windowMs: 60 * 60 * 1000, //per jam
  message: 'To many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

// body parser
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true, limit: '15kb' }));
app.use(cookieParser());

// data sanitization after body parser is perfect place
// 1) data sanitization against nosql query injection
app.use(mongoSanitize());

// 2) data sanitization against xss
// clean any user i n put from malisius html code, by converting all html symbol
app.use(xss());

// prevent paameter polution
// whitelist: pengecualian
app.use(
  hpp({
    whitelist: [],
  })
);

app.use(compression());

// *************************ROUTES***************************
// serving static files
app.use(express.static(`${__dirname}/public`));

app.use('/admin', adminViewRouter);
app.use('/', mainViewRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/masjid', masjidRouter);
// app.get('/api/v1/doa', (req, res, next) => {
//   res.json(doaJson);
// });

// handling un handled routes
// all means get,post and etc
app.all('*', (req, res, next) => {
  // if the next recieve arguments, express assume that is an error,
  // and will be pass all middleware stack and go straight to middleware error in below
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

// error handling middleweere by express,

app.use(require('./controllers/errorControllers'));

module.exports = app;
