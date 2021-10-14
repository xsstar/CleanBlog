const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Post = require("./models/Post");
const { find, findOne } = require("./models/Post");
const postController = require("../CleanBlog/controllers/postControllers");
const pageController = require("../CleanBlog/controllers/pageControllers");

const app = express();

//Mongoose DB
mongoose
  .connect(
    "mongodb+srv://havva:FZO0w7XxPPz3qHlJ@cluster0.3la7j.mongodb.net/cleanblog-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES

app.get("/", postController.getAllPosts);

app.get("/posts/:id", postController.getPost);

app.get("/about", pageController.getAboutPage);

app.get("/add_post", pageController.getAddPage);

app.post("/posts", postController.createPost);

//Post sayfasında update butona tıklayınca yönlendirme
app.get("/posts/edit/:id", pageController.getEditPage);

//Edit sayfasında : update butona put-req verdik ve post detay sayfaya yönlendir diyoruz.
app.put("/posts/:id", postController.updatePost);

//delete post
app.delete("/posts/:id", postController.deletePost);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portta başlatıldı..`);
});
