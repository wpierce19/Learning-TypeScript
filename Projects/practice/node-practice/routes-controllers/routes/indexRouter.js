const {Router} = require("express");

const indexRouter = Router();


indexRouter.get("/", (req,res) => res.send("Main Page"));

module.exports = indexRouter;