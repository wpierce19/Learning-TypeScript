const db = require("../db/queries");

async function getUsernames(req,res) {
    const usernames = await db.getAllUsernames();
    console.log("Usernames: ", usernames);
    res.render("index", {usernames});
};

async function createUsernameGet(req, res) {
    res.render("form", {title: "Create User"});
}
  

async function createUsernamePost(req, res) {
    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/");
}

module.exports = {
    getUsernames,
    createUsernameGet,
    createUsernamePost
};