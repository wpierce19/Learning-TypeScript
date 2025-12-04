const {Router} = require("express");
const {getAuthorById} = require("../controllers/authorController"); //COntroller

const authorRouter = Router();

authorRouter.get("/", (req,res) => res.send("All authors"));
authorRouter.get("/:authorId", getAuthorById);


//Processes request and does not have a built controller to make changes to response
/*
authorRouter.get("/:authorId", (req,res) => {
    const {authorId} = req.params;
    res.send(`Author ID: ${authorId}`);
});
*/

module.exports = authorRouter;