const db = require("../db/queries");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


//Load all messages
//add functionality to only show authors if user is a 'member'
//getAllMessages
exports.getMessages = async (req,res) => {
    try {
        const messages = await db.getAllMessages();

        const currentUser = req.user || {membership_status: 'guest'};

        res.render('index', {
            title: "Messages",
            messages,
            currentUser
        });
    } catch (error) {
        console.error("Error rendering messages:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.showUserForm = async (req,res) => {
    res.render('sign-up-form', {errors: []});
};

//Creates a new user when a completed sign-up form is given
//insertUser
exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('sign-up-form', { errors: errors.array() });
    }
    const { firstName, lastName, email, password, adminPass } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const isAdmin = adminPass === process.env.ADMIN_CODE;
      const newUser = await db.insertUser(firstName, lastName, email, hashedPassword, isAdmin);
      if (!newUser) {
        return res.status(400).send("Email already exists. Please use a different email.");
      }
      // Set a success flash message
      req.flash('success_msg', 'Account created successfully!');
      // Redirect back to the index page
      res.redirect("/");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
};

//message deletion
//deleteMessages
exports.deleteMessage = async (req, res) => {
    // Check if user is logged in and is an admin
    if (!req.user || !req.user.is_admin) {
      return res.status(403).send("Unauthorized: Admins only");
    }
    const messageId = req.params.id;
    try {
      await db.deleteMessages(messageId);
      res.redirect("/");
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).send("Internal Server Error");
    }
};

exports.showLoginForm = async (req,res) => {
    res.render('log-in');
};

exports.showNewMessageForm = async(req,res) => {
    res.render("create-Message");
};
exports.showMemberPage = async (req,res) => {
    res.render('members');
};

//Handles message creation
//insertMessage
exports.createMessage = async (req, res) => {
    const { title, messageBody } = req.body;
  
    // Optionally, ensure the user is logged in before allowing message creation
    if (!req.user) {
      return res.redirect("/log-in");
    }
  
    try {
      await db.insertMessage(req.user.id, title, messageBody);
      res.redirect("/");
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).send("Internal Server Error");
    }
  };

//assigns member  status to user
//insertMembershipStatus
exports.giveMembership = async (req, res) => {
    if (!req.user) {
      return res.redirect("/log-in");
    }
    try {
      const updateUser = await db.insertMemberStatus(req.user.id);
      // Corrected variable name below:
      req.user.membership_status = updateUser.membership_status;
      res.redirect("/");
    } catch (error) {
      console.error("Error giving membership:", error);
      res.status(500).send("Error updating membership status");
    }
};

/*
module.exports = {
    getMessages,
    createUser,
    deleteMessage,
    userLogin,
    createMessage,
    giveMembership,
    showUserForm,
    showLoginForm
}
*/