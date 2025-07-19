const AuthService = require('../services/authService');
const { asyncHandler } = require('../middlewares/errorMiddleware');
const { sendCreated, sendSuccess } = require('../utils/responseHelper');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  register = asyncHandler(async (req, res) => {
    const user = await this.authService.register(req.body);
    sendCreated(res, { userId: user.id }, 'User registered successfully!');
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await this.authService.login(email, password);
    sendSuccess(res, result, 'Login successful');
  });
}

const authController = new AuthController();

module.exports = {
  register: authController.register,
  login: authController.login,
};