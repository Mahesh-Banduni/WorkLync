const JWTToken = require("../utils/token.generation.util.js");
const hashValue = require("../utils/hashing.util.js");
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Login a user and issue a JWT token
const authUser = async (email, password) => {

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new NotFoundError("No user exist with this email address");
  }

  const hashPassword = hashValue.hash(password);

  // Check password is correct
  if (user.password !== hashPassword) {
    throw new BadRequestError("Incorrect password");
  }

  const response=JWTToken.generateToken(user);
  return { response, user: {name: user.name, email: user.email, role: user.role}};
};

module.exports = {
  authUser,
};
