const {Router} = require("express");
const memberController = require("../controllers/memberController");
const memberRouter = Router();
const {body} = require("express-validator");
const passport = require("passport");

const validateUserSignup = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password')
        .isLength({min:6}).withMessage('Password must be at least 6 characters')
        .matches(/\d/).withMessage('Password must contain a number'),
    body('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
    body('adminPass').optional().trim()
];

memberRouter.get("/", memberController.getMessages);
memberRouter.get("/newMessage", memberController.showNewMessageForm);
memberRouter.post("/newMessage", memberController.createMessage);
memberRouter.get("/newUser", memberController.showUserForm);
memberRouter.post("/newUser", validateUserSignup, memberController.createUser);
memberRouter.get("/log-in", memberController.showLoginForm);
memberRouter.post("/log-in", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureFlash: true
}));
memberRouter.get("/members", memberController.showMemberPage);
// Existing route for membership remains unchanged
memberRouter.post("/newMember", memberController.giveMembership);
memberRouter.post("/deleteMessage/:id", memberController.deleteMessage);

module.exports = memberRouter;