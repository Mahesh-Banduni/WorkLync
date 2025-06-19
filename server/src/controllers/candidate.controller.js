const candidateService = require("../services/candidate.service.js");

// Create a new candidate (with resume upload)
const createCandidate = async (req, res, next) => {
  try {
    const adminId= req.user.id;
    const candidate = await candidateService.createCandidate(adminId, req.body, req.file);
    res.status(201).json({
      message: "Candidate profile created successfully",
      candidate,
    });
  } catch (error) {
    next(error);
  }
};

// Get all candidates (with optional filters/search)
const getAllCandidates = async (req, res, next) => {
  try {
    const adminId= req.user.id;
    const filters = req.query;
    const candidates = await candidateService.getAllCandidates(adminId, filters);
    res.status(200).json({
      candidates,
    });
  } catch (error) {
    next(error);
  }
};

// Get candidate by ID
const getCandidateById = async (req, res, next) => {
  try {
    const adminId= req.user.id;
    const userId=req.params.id;
    const candidate = await candidateService.getCandidateById(adminId, userId);
    res.status(200).json({
      data: candidate,
    });
  } catch (error) {
    next(error);
  }
};

// Download candidate's resume (returns Cloudinary URL)
const downloadResume = async (req, res, next) => {
  try {
    const adminId= req.user.id;
    const userId= req.params.id;
    const url = await candidateService.getCandidateResumeUrl(adminId, userId);
    res.status(200).json({
      message: "Resume URL retrieved successfully",
      data: {url},
    });
  } catch (error) {
    next(error);
  }
};

// Change candidate status
const changeCandidateStatus = async (req, res, next) => {
  try {
    const adminId= req.user.id;
    const userId= req.params.id;
    const candidate = await candidateService.changeCandidateStatus(adminId, userId, req.body.status);
    res.status(200).json({
      message: "Candidate status changed successfully",
      candidate,
    });
  } catch (error) {
    next(error);
  }
};

// Delete candidate by ID
const deleteCandidate = async (req, res, next) => {
  try {
    const adminId= req.user.id;
    const userId= req.params.id;
    await candidateService.deleteCandidate(adminId, userId);
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  downloadResume,
  changeCandidateStatus,
  deleteCandidate
};
