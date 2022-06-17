const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const fileRoutes = require('./routes/file');

const app = express();
const port = process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  return next();
});

app.use('/api/file', fileRoutes);


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, server_host, () => {
      console.log(`Server is up on port ${port}!`);
    });
  });