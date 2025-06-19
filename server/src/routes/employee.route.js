const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller.js");
const auth = require("../middlewares/auth.js");

router.post("/", auth, employeeController.createEmployee);
router.get("/:id", auth, employeeController.getEmployeeById);
router.get("/all", auth, employeeController.getAllEmployees);
router.put("/:id", auth, employeeController.updateEmployee);
router.delete("/:id", auth, employeeController.deleteEmployee);

module.exports = router;
