// routes/usersRouter.js
const { Router } = require("express"); // Import Router from Express
const usersController = require("../controllers/usersController"); // Import usersController
const usersRouter = Router(); // Create a Router instance

// Define routes
usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);
usersRouter.post("/:id/delete", usersController.usersDeletePost);

module.exports = usersRouter; // Export the router

