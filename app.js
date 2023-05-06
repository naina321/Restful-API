const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extend: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/api", {
  useNewUrlParser: true,
});
const articleSchema = {
  name: String,
  title: String,
};
const Article = mongoose.model("items", articleSchema);

app.get("/articles", (req, res) => {
  Article.find((err, found) => {
    if (err) console.log(err);
    else res.send(found);
  });
});

app.post("/articles", (req, res) => {
  console.log(req.body);
  const element1 = new Article({
    name: req.body.name,
    title: req.body.title,
  });

  element1.save();
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
