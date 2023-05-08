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

app.delete("/articles", (req, res) => {
  Article.deleteMany((err) => {
    if (!err) res.send("deleted");
    else res.send(err);
  });
});

app.get("/articles/:articleTitle", (req, res) => {
  Article.find({ name: req.params.articleTitle }, (err, articleFound) => {
    console.log(req.params.articleTitle);
    if (err) res.send(err);
    else res.send(articleFound);
    console.log(articleFound);
  });
});

//update any document
app.put("/articles/:articleTitle", (req, res) => {
  console.log(req.params.articleTitle, req.body.name, req.body.title);
  Article.updateOne(
    { name: req.params.articleTitle },
    { name: req.body.name, title: req.body.title },
    (err) => {
      if (err) res.send(err);
      else res.send("updated");
    }
  );
});

//update a particularrecord inside a document
app.patch("/articles/:articleTitle", (req, res) => {
  // console.log(req.params.articleTitle, req.body.name, req.body.title);
  Article.updateOne(
    { name: req.params.articleTitle },
    { $set: { title: req.body.title } },
    (err) => {
      if (err) res.send(err);
      else res.send("updated");
    }
  );
});

//delete a specific request
app.delete("/articles/:articleName", (req, res) => {
  Article.deleteOne({ name: req.params.articleName }, (err) => {
    if (err) console.log(err);
    else res.send("deleted");
  });
});
app.listen(3000, () => {
  console.log("server started on port 3000");
});
