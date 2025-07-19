const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const errorMiddleware = require('./middlewares/errors')

app.use(express.json({ limit: "10mb"}));
app.use(bodyParser.json({ limit: "10mb"}));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true}));
app.use(cookieParser());
app.use(fileUpload());


app.use("*",cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Logging middleware - logs IP, User-Agent, URL
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
  const ua = req.headers['user-agent'];
  
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${ip} - UA: ${ua}`);

  next();
});

//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');
const welcome = require('./routes/welcome');


app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use("/api/v1", payment)
app.use('/', welcome);



//middleware to handle error
app.use(errorMiddleware)

module.exports = app