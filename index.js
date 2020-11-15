const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');

const userRoutes = require('./src/lib/routes/userRoutes');
const commentRoutes = require('./src/lib/routes/commentRoutes');
const dbImport = require('./dbImport');

mongoose.connect('mongodb://mongo:27017/demodb');
const db = mongoose.connection;

const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
        chalk.yellow(tokens['remote-addr'](req, res)),
        chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
    ].join(' ');
});

const port = process.env.PORT || 8000;
const app = express();
app.use(morganMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes)
app.use('/comments', commentRoutes)

app.use('*', (req, res) => {
    res.status(404).send('');
});

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', async function () {
    console.log("Successfully connected to MongoDB!");
    await dbImport();
    app.listen(port);
    console.log(`Listening on port ${port}!`);
});