const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const api = require('./routes/index');
const morgan = require('morgan')
const winston = require('./config/winston')

app.use(bodyParser.json());
// app.use(morgan('combined', {stream: winston.stream}));
app.use('/api', api);

const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`Listening on port ${port}...`));