const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidate.controller.js");
const auth = require("../middlewares/auth.js");
const {uploadDocument} = require("../middlewares/multer.js");

router.post("/", auth, uploadDocument.single('resume'), candidateController.createCandidate);
router.get("/", auth, candidateController.getAllCandidates);
router.post("/selected/:id", auth, candidateController.moveToEmployee);
router.get("/download-resume/:id",auth, candidateController.downloadResume);
router.get("/:id", auth, candidateController.getCandidateById);
router.delete("/:id", auth, candidateController.deleteCandidate);

module.exports = router;
