const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidate.controller.js");
const auth = require("../middlewares/auth.js");
const {uploadDocument} = require("../middlewares/multer.js");

router.post("/", auth, uploadDocument.single('resume'), candidateController.createCandidate);
router.get("/", auth, candidateController.getAllCandidates);
router.put("/:id/change-status", auth, candidateController.changeCandidateStatus);
router.get("/:id/download-resume",auth, candidateController.downloadResume);
router.get("/:id", auth, candidateController.getCandidateById);
router.delete("/:id", auth, candidateController.deleteCandidate);

module.exports = router;
