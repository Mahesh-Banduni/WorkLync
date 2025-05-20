const { PrismaClient } = require('@prisma/client');
const { uploadFile } = require('../utils/file.upload.util');
const { ConflictError, NotFoundError } = require('../errors/errors');
const fs = require('fs/promises');

const prisma = new PrismaClient();

// Create a new candidate profile with resume upload
const createCandidate = async (candidateData, resumeFile) => {
    console.log(candidateData)
  // Check if candidate exists
  const existing = await prisma.candidate.findUnique({ where: { email: candidateData.email } });
  if (existing) throw new ConflictError('Candidate with this email already exists');

  // Upload resume to Cloudinary
  const resumeUrl = await uploadFile(resumeFile);

  // Create candidate in DB
  const candidate = await prisma.candidate.create({
    data: {
      name: candidateData.fullName,
      email: candidateData.email,
      phoneNumber: candidateData.phoneNumber,
      position: candidateData.position,
      yearsOfExperience: parseFloat(candidateData.yearsOfExperience),
      resumefileUrl: resumeUrl || "",
    },
  });
  return candidate;
};

// Download candidate's resume (returns the Cloudinary URL)
const getCandidateResumeUrl = async (candidateId) => {
  const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
  if (!candidate) throw new NotFoundError('Candidate not found');
  if (!candidate.resumefileUrl) throw new NotFoundError('Resume not found');
  return candidate.resumefileUrl;
};

// Move selected candidate to Employee
const moveCandidateToEmployee = async (candidateId) => {
  const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
  if (!candidate) throw new NotFoundError('Candidate not found');
  await prisma.candidate.update({
    where: { id: candidateId },
    data: { applicationStatus: 'Selected' },
  });
  if (candidate.applicationStatus !== 'Selected') throw new ConflictError('Candidate not selected');

  // Create Employee
  const employee = await prisma.employee.create({
    data: {
      name: candidate.name,
      email: candidate.email,
      phoneNumber: candidate.phoneNumber,
      position: candidate.position,
      department: "",
      dateOfJoining: new Date(),
      attendanceStatus: "Present",
    },
  });

  await prisma.candidate.delete({ where: { id: candidateId } });

  return employee;
};

// Filter/Search Candidates
const searchCandidates = async (filters) => {
  // filters: { name, email, position, applicationStatus }
  const candidates = await prisma.candidate.findMany({
    where: {
      ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
      ...(filters.email && { email: { contains: filters.email, mode: 'insensitive' } }),
      ...(filters.position && { position: filters.position }),
      ...(filters.applicationStatus && { applicationStatus: filters.applicationStatus }),
    },
    orderBy: { createdAt: 'desc' },
  });
  if(candidates.length=='0') throw NotFoundError("No candidate exists");
  return candidates;
};

const getCandidateById = async (candidateId) => {
  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
  });
  if (!candidate) {
    throw new NotFoundError("Candidate not found");
  }
  return candidate;
};

// Delete Candidate
const deleteCandidate = async (candidateId) => {
    const candidate = await prisma.candidate.delete({ where: { id: candidateId } });
    if(!candidate) throw new NotFoundError("Candidate not found");
    return candidate;
};

module.exports = {
  createCandidate,
  getCandidateResumeUrl,
  moveCandidateToEmployee,
  searchCandidates,
  getCandidateById,
  deleteCandidate
};
