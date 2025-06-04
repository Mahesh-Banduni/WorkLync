const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller.js");
const auth = require("../middlewares/auth.js");

router.post("/", employeeController.createEmployee);
router.get("/:id", employeeController.getEmployeeById);
router.get("/all", employeeController.getAllEmployees);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
