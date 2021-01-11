const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || "8000";
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
var requestTime = function (req, res, next) {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    (hour > 8 && hour < 18 && day > 0 && day < 6) ? req.requestTime = true : req.requestTime = false;
    console.log(req.requestTime);
    next();
}
app.use("*", requestTime);
//Home page
app.get("/", (req, res) => {
    res.render("index", { title: "Home", isOpen: req.requestTime });
});
//services
app.get("/Services", (req, res) => {
    res.render("Services", { title: "Our Services", isOpen: req.requestTime });
});
//contacts
app.get("/contactUs", (req, res) => {
    res.render("contactUs", { title: "Contact Us", isOpen: req.requestTime });
});
//port listener
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});