const express = require("express");
const app = express();
const memberRouter = require("./routes/memberRouter");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const {initializePassport} = require("./config/passportConfig");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
    secret: "92dbd3bbff84acfa8b2483867f540a71810f79b1bf5844a15b278fa905e074fef1d98a554742180769ddd8610e13d870a60ef2c4881b0ebaf3b295a8f3707913",
    resave: false,
    saveUninitialized: false
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

app.use("/", memberRouter);

app.listen(3000, () => console.log("app listening on port 3000"));