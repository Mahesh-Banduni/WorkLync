const candidateService = require("../services/candidate.service.js");

// Create a new candidate (with resume upload)
const createCandidate = async (req, res, next) => {
  try {
    console.log(req.body);
    const candidate = await candidateService.createCandidate(req.body, req.file);
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
    const filters = req.query;
    const candidates = await candidateService.searchCandidates(filters);
    res.status(200).json({
      data: candidates,
    });
  } catch (error) {
    next(error);
  }
};

// Get candidate by ID
const getCandidateById = async (req, res, next) => {
  try {
    const candidate = await candidateService.getCandidateById(req.params.id);
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
    const url = await candidateService.getCandidateResumeUrl(req.params.id);
    res.redirect(url);
  } catch (error) {
    next(error);
  }
};

// Move selected candidate to employee
const moveToEmployee = async (req, res, next) => {
  try {
    const employee = await candidateService.moveCandidateToEmployee(req.params.id);
    res.status(200).json({
      message: "Candidate moved to employee successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// Delete candidate by ID
const deleteCandidate = async (req, res, next) => {
  try {
    await candidateService.deleteCandidate(req.params.id);
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
  moveToEmployee,
  deleteCandidate
};
