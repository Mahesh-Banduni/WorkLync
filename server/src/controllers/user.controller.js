const userService = require("../services/user.service.js");
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const { response, user } = await userService.createUser(req.body);

    res.status(201).json({
      messagwe: "User Registered Successfully",
      user: { user },
      token: {response}
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    if(!users.data){
      throw new NotFoundError("Users not found");
    }
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user by ID
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.user.id, req.body);
    res.status(200).json({
      message: "User Details Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user by ID
const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.user.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
