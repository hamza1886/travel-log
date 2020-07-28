const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const rfs = require('rotating-file-stream');
const console = require('console');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express();
// noinspection JSCheckFunctionSignatures
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

// log only 4xx and 5xx responses to console
// noinspection JSUnusedGlobalSymbols,JSCheckFunctionSignatures
app.use(morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"', {
  skip: (req, res) => res.statusCode < 400,
}));
// log all requests to access.log
// noinspection JSCheckFunctionSignatures
app.use(morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"', {
  stream: rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'logs'),
  }),
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/logs', logs);

// noinspection JSCheckFunctionSignatures
app.use(middlewares.notFound);
// noinspection JSCheckFunctionSignatures
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
});
