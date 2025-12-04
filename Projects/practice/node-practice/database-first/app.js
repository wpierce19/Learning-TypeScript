const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use("/", userRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Now listening on Port ${PORT}`);
})