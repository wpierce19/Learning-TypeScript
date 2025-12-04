const express = require("express");
const index = express();

const array = [];

index.get("/", (req,res) => {
    res.json({name: "frodo"});
});

index.get("/test", (req,res) => res.json({array}));

index.post("/test", (req,res) => {
    array.push(req.body.item);
    res.send('Success!');
});

module.exports = index;