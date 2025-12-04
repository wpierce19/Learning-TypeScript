const path = require("node:path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const links = [
    {href: "/", text: "home"},
    {href: "about", text:"about"},
];

const users = ["Rose", "Cake", "Biff"];


app.get("/", (req,res) => {
    res.render("index", {links: links, users: users});
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Now running on port ${PORT}`);
})