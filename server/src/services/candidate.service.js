const { PrismaClient } = require('@prisma/client');
const { ConflictError, NotFoundError, BadRequestError } = require('../errors/errors');
const { uploadFileToB2, getPrivateDownloadUrl } = require('../utils/file.upload.util.js');

const prisma = new PrismaClient();

const createCandidate = async (adminId, candidateData, resumeFile) => {
  // Check admin role
  const adminCheck = await prisma.user.findFirst({
    where: { userId: adminId, role: 'ADMIN' },
  });
  if (!adminCheck) {
    throw new BadRequestError('Unauthorized access');
  }

  // Check if candidate exists
  const existing = await prisma.candidate.findUnique({ where: { email: candidateData.email } });
  if (existing) throw new ConflictError('Candidate with this email already exists');

  // Upload resume to Backblaze B2
  const {fileUrl} = await uploadFileToB2(resumeFile);

  const password = hashValue.hash('Password@123');

  // Create candidate in DB
  const user = await prisma.user.create({
    data: {
      name: candidateData.name,
      email: candidateData.email,
      password: password,
      role: 'USER'
    },
  })
  const candidate = await prisma.candidate.create({
    data: {
      userId: user.userId,
      name: user.name,
      email: user.email,
      phoneNumber: candidateData.phoneNumber,
      position: candidateData.position,
      yearsOfExperience: parseFloat(candidateData.yearsOfExperience),
      resumefileUrl: fileUrl || '',
    },
  });

  return candidate;
};

// Download candidate's resume (returns the Cloudinary URL)
const getCandidateResumeUrl = async (adminId, candidateId) => {
  const adminCheck = await prisma.user.findFirst({
      where: { userId: adminId, role: "ADMIN" },
    });
  
    if (!adminCheck) {
      throw new BadRequestError("Unauthorized access");
    }
  const candidate = await prisma.candidate.findUnique({ where: { candidateId } });
  if (!candidate) throw new NotFoundError('Candidate not found');
  if (!candidate.resumefileUrl) throw new NotFoundError('Resume not found');

  // Extract file name from URL
  let fileName = candidate.resumefileUrl.split('/').pop();
  fileName=`documents/${fileName}`;

  const signedUrl = await getPrivateDownloadUrl(fileName);

  return signedUrl;
};

// Change candidate status
const changeCandidateStatus = async (adminId, candidateId, status) => {
  const adminCheck = await prisma.user.findFirst({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
  const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
  if (!candidate) throw new NotFoundError('Candidate not found');
  const updatedCandidate =await prisma.candidate.update({
    where: { id: candidateId },
    data: { applicationStatus: status },
  });

  return updatedCandidate;
};

// Filter/Search Candidates
const getAllCandidates = async (adminId, filters) => {
  const adminCheck = await prisma.user.findFirst({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
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

const getCandidateById = async (adminId, candidateId) => {
  const adminCheck = await prisma.user.findFirst({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
  });
  if (!candidate) {
    throw new NotFoundError("Candidate not found");
  }
  return candidate;
};

// Delete Candidate
const deleteCandidate = async (adminId, candidateId) => {
  const adminCheck = await prisma.user.findFirst({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
    const candidate = await prisma.candidate.delete({ where: { id: candidateId } });
    if(!candidate) throw new NotFoundError("Candidate not found");
    return candidate;
};

module.exports = {
  createCandidate,
  getCandidateResumeUrl,
  changeCandidateStatus,
  getAllCandidates,
  getCandidateById,
  deleteCandidate
};
