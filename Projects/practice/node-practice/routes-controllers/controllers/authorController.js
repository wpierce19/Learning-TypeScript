const db = require("../db");
const asyncHandler = require("express-async-handler");
const CustomNotFoUndError = require("../errors/CustomNotFoundError");

const getAuthorById = asyncHandler(async (req,res) => {
    const {authorId} = req.params;

    const author = await db.getAuthorById(Number(authorId));

    if (!author)
    {
        throw new CustomNotFoUndError("Author not found");
    }

    res.send(`Author name: ${author.name}`);
})


//Below function has no error handling like the function above
/*
async function getAuthorById(req,res) {
    const {authorId} = req.params; //Extracts authorId from req.params

    const author = await db.getAuthorById(Number(authorId)); //invokes database function to retrieve author data based on authorId

    if(!author)
    {
        res.status(404).send("Author not found");
        return;
    }

    res.send(`Author Name: ${author.name}`);
};
*/

module.exports = {getAuthorById};