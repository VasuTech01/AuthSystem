const express = require("express");
const Users = require("../models/user");

const router = express.Router();
router.get("/login", (req, res) => {
    res.render('login', {
        title: "SignUp/Login",
        username:"No User"
    });
});
router.post("/signup", async (req, res) => {
      
    const user = new Users(req.body);
    try {
        const token = await user.getAuthToken();
        res.render("index", { title:"Home",username:user.username });
    } catch (err) {
        console.log(err.message);
        res.render("404", {
            title: "404",
            message: err.message,
            name: "VASU SAINI",
          });
    }
})
router.post("/log_in", async(req, res) => {
  //  console.log(req.params);
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await user.getAuthToken();
        res.render("index", { title:"Home",username:user.username });
    } catch (err) {
        res.render("404", {
            title: "404",
            message: err.message,
            name: "VASU SAINI",
          });
    }
    
})


module.exports = router;