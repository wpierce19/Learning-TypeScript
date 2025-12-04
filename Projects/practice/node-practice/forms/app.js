const { body, validationResult} = require("express-validator");
const express = require("express");
const app = express();


//Below is how to handle any validation errors
/*
const controller = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).render("index", {
            errors: errors.array(),
        });
    }

    res.redirect("/success"); //if no errors found will redirect to /success
}
*/