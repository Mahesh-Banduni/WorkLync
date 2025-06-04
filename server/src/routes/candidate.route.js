const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidate.controller.js");
const auth = require("../middlewares/auth.js");
const {uploadDocument} = require("../middlewares/multer.js");

router.post("/",uploadDocument, candidateController.createCandidate);
router.get("/", candidateController.getAllCandidates);
router.post("/selected/:id", candidateController.moveToEmployee);
router.get("/download-resume/:id", candidateController.downloadResume);
router.get("/:id", candidateController.getCandidateById);
router.delete("/:id", candidateController.deleteCandidate);

module.exports = router;
