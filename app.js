const {
  env: { PORT, DB_PORT },
} = require("process");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

const laxman = process.env.laxman;
console.log("🚀 ~ file: app.js:20 ~ laxman:", laxman);
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", { user: req.user, allBlogs: allBlogs });
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);

const connectDB = require("./connect");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectDB(DB_PORT);

app.listen(PORT, () => console.log(`server started @ ${PORT}`));
