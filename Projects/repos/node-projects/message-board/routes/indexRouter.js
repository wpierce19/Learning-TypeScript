const {Router} = require("express");
const indexRouter = Router();

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    },
];

indexRouter.get("/", (req,res) => {
    res.render("index", {title: "Message Board", messages:  messages})
});

indexRouter.get("/message/:user", (req,res) => {
    const user = req.params.user;
    const userMessage = messages.find((msg) => msg.user === user);

    if (userMessage)
    {
        return res.status(404).send("No user found or no messages found");
    }

    res.render("messageDetails", {
        title: `${user}'s Message`,
        message: userMessage
    })
})

indexRouter.get("/new", (req,res) => {
    res.render("form");
});

indexRouter.post("/new", (req, res) => {
    if (!req.body.message || !req.body.user)
    {
        res.status(400).send("Please complete all fields then re-submit");
    }
    messages.push({
        text: req.body.message,
        user: req.body.user,
        added: new Date(),
    });
    res.redirect("/");
});

module.exports = indexRouter;