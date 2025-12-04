//using express to initialise a server and to easily process GET requests to display new pages
const express = require("express");
const app = express();


app.get("/", (req, res) => res.sendFile("./index.html", {root: __dirname}));
app.get("/about", (req,res) => res.sendFile("./about.html", {root: __dirname}));
app.get("/contact", (req,res) => res.sendFile("./contact-me.html", {root: __dirname}));

//Invalid path processing
app.use((req,res) => {
    res.status(404).sendFile("./404.html", {root: __dirname});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})