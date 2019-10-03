const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://aircnc:88222547@aircnc-j1ial.mongodb.net/aircnc?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);
