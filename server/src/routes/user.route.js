const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.js");

router.post("/register", userController.createUser);
router.get("/details", auth, userController.getUserById);
router.get("/all", userController.getAllUsers);
router.put("/update", auth, userController.updateUser);
router.delete("/delete", auth, userController.deleteUser);

module.exports = router;
