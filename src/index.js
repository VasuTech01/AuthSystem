const express = require('express');
const path = require('path');
const hbs = require('hbs');
require("./db/mongoose");
const userRouter = require("./routers/user");
const bodyParser=require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.render('index', {
    title: "Home",
    username:"No User"
  });
})
app.use(userRouter);



app.get("*", (req, res) => {
  console.log(req.url);
    res.render("404", {
      title: "404",
      message: "PAGE NOT FOUND",
      name: "VASU SAINI",
    });
  });


app.listen(port, () => {
    console.log(`listening requests on ${port}`);
})