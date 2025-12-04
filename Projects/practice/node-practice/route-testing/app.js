const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

const indexRouter = require("./index");
app.use("/", indexRouter);

app.listen(3000, () => console.log("Running on port 3000"));