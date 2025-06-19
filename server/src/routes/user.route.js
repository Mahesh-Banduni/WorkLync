const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.js");

router.post("/register", auth, userController.createUser);
router.get("/details", auth, userController.getUserById);
router.get("/", auth, userController.getAllUsers);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;