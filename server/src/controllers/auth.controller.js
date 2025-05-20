const authService = require("../services/auth.service.js");

// Login a user
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { response, user } = await authService.authUser(
      email,
      password
    );
    // Send back the user data and the token
    res.status(200).json({
      message: "User logged-in successfully",
      token: { response },
    });
  } catch (error) {
    next(error);
  }
};

module.exports={authUser}