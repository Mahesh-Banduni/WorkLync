const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");
const JWTToken = require("../utils/token.generation.util.js");
const hashValue = require("../utils/hashing.util.js");
const dotenv = require("dotenv");
dotenv.config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new user
const createUser = async (adminId, userData) => {
  const email = userData.email;
  
  const adminCheck = await prisma.user.findFirst({
    where: { userId: adminId, role: "ADMIN"},
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  const password = hashValue.hash(userData.password);

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: email,
      role: "ADMIN",
      password: password,
    },
    select: {
      userId: true,
      name: true,
      role: true
    }
  });

  const response = JWTToken.generateToken(user);

  return { response, user };
};

const getAllUsers = async (adminId) => {
  const adminCheck = await prisma.user.findFirst({
    where: { userId: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }

  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async (userId) => {
  const user = await prisma.user.findFirst({
    where: {userId},
    select:{
      userId: true,
      name: true,
      email: true,
      role: true
    }
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

const updateUser = async (adminId, userId, updateData, files) => {
  const adminCheck = await prisma.user.findFirst({
    where: { userId: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
  const user = await prisma.user.findUnique({
    where: { userId: userId },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  let updatedFields = {};
  if (updateData.name) updatedFields.name = updateData.name;
  if (updateData.password) updatedFields.password = hashValue.hash(updateData.password);

  const updatedUser = await prisma.user.update({
    where: { userId: userId },
    data: updatedFields,
  });

  return updatedUser;
};

const deleteUser = async (adminId, userId) => {
  const adminCheck = await prisma.user.findFirst({
    where: { userId: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }

  let user = await prisma.user.findUnique({
    where: { userId: userId },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }

 user = await prisma.user.delete({
    where: { userId: userId },
  });
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
