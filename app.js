//read files in the directory
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const PORT = 5000;
const app = express();
const passport = require("passport");
const { initialize } = require("passport");
const { passportConfig } = require("./config/passport");
const dotenv = require("dotenv").config();

//middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passportConfig(passport);

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);
mongoose
  .connect(
    "mongodb://sruthipalle:frontend123@ac-6jshomw-shard-00-00.pt3egs8.mongodb.net:27017,ac-6jshomw-shard-00-01.pt3egs8.mongodb.net:27017,ac-6jshomw-shard-00-02.pt3egs8.mongodb.net:27017/?ssl=true&replicaSet=atlas-ybqs7j-shard-0&authSource=admin&retryWrites=true&w=majority"
    // "mongodb+srv://sruthipalle:frontend123@expenseapp.pt3egs8.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongodb connection is successful"))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
