const {Router} = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

//User update routes
usersRouter.get("/:id/update", usersController.userUpdateGet);
usersRouter.post("/:id/update", usersController.userUpdatePost);

module.exports = usersRouter;