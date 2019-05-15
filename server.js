const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );
    console.log("Database Connected");
  } catch (error) {
    console.log(err.message);
  }
};

const app = express();

connectDB();

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
