require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./routes');
// const errorHandler = require('./middleware/errorhandler');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// routes.use(errorHandler);

app.listen(port, console.log(`server listen on ${port}`));

module.exports = app;