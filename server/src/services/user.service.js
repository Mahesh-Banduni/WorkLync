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
const createUser = async (userData) => {
  const email = userData.email;

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
      role: "Admin",
      password: password,
    },
  });

  const response = JWTToken.generateToken(user);

  return { response, user };
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

const updateUser = async (userId, updateData, files) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  let updatedFields = {};
  if (updateData.name) updatedFields.name = updateData.name;
  if (updateData.password) updatedFields.password = hashValue.hash(updateData.password);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updatedFields,
  });

  return updatedUser;
};

const deleteUser = async (userId) => {
  // Throws error if user does not exist

    const user = await prisma.user.delete({
      where: { id: userId },
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
