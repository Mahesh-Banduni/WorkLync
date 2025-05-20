const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidate.controller.js");
const auth = require("../middlewares/auth.js");

router.post("/create", candidateController.createCandidate);
router.get("/:id", candidateController.getCandidateById);
router.get("/all", candidateController.getAllCandidates);
router.put("/:id", candidateController.moveToEmployee);
router.get("/:id", candidateController.downloadResume);
router.delete("/:id", candidateController.deleteCandidate);

module.exports = router;
