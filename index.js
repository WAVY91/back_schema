const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/User");
const eje = require("ejs");

const app = express();

const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const URI = process.env.MONGO_URI;
mongoose.connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});


app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();
    res.redirect("/signin");
  } catch (err) {
    console.log(err);
    res.send("Error creating user");
  }
});


app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.render("dashboard", { firstname: user.firstname });
    } else {
      res.send("Invalid crendentials entry");
    }
  } catch (err) {
    console.log(err);
    res.send("Error signing in");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
