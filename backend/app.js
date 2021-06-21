const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/user");

mongoose.connect(
  "mongodb+srv://hnNbyq3kebWmE8MZ:" +
    process.env.MONGO_ATLAS_PW +
    "@my-service-book.pfrqz.mongodb.net/MyServiceBook?retryWrites=true&w=majority"
);
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use((req, res, next) => {
  res.status(200).json({
    message: "It works!2",
  });
});

module.exports = app;
