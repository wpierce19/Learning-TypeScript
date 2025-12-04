const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

exports.usersListGet = (req, res) => {
    const users = usersStorage.getUsers(); // Fetch users from storage
    res.render("index", { title: "Users List", users: users }); // Pass users to EJS
};


exports.usersCreateGet = (req, res) => {
    res.render("createUser", { title: "Create User", user: {} }); // Pass an empty user
};


exports.usersCreatePost = [
    body("firstName").trim().isAlpha().withMessage("First name must only contain letters."),
    body("lastName").trim().isAlpha().withMessage("Last name must only contain letters."),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            });
        }
        const { firstName, lastName } = req.body;
        usersStorage.addUser({ firstName, lastName });
        res.redirect("/");
    }
];

exports.usersUpdateGet = (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.render("updateUser", { title: "Update User", user });
};

exports.usersUpdatePost = [
    body("firstName").trim().isAlpha().withMessage("First name must only contain letters."),
    body("lastName").trim().isAlpha().withMessage("Last name must only contain letters."),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update user",
                user: usersStorage.getUser(req.params.id),
                errors: errors.array(),
            });
        }
        usersStorage.updateUser(req.params.id, { firstName: req.body.firstName, lastName: req.body.lastName });
        res.redirect("/");
    }
];

exports.usersDeletePost = (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
};



  