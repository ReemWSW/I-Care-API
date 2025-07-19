const UserService = require('../services/userService');
const { asyncHandler } = require('../middlewares/errorMiddleware');
const { sendSuccess } = require('../utils/responseHelper');
const { createFullImageUrl } = require('../utils/fileHelper');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.getProfile(req.userId);
    user.profileImageUrl = createFullImageUrl(req, user.profileImageUrl);
    sendSuccess(res, user);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.updateProfile(req.userId, req.body);
    user.profileImageUrl = createFullImageUrl(req, user.profileImageUrl);
    sendSuccess(res, { user }, 'Profile updated successfully');
  });

  uploadProfilePicture = asyncHandler(async (req, res) => {
    const relativePath = `/uploads/${req.file.filename}`;
    const user = await this.userService.updateProfileImage(req.userId, relativePath);
    user.profileImageUrl = createFullImageUrl(req, user.profileImageUrl);
    sendSuccess(res, { user }, 'Profile picture uploaded successfully!');
  });
}

const userController = new UserController();

module.exports = {
  getProfile: userController.getProfile,
  updateProfile: userController.updateProfile,
  uploadProfilePicture: userController.uploadProfilePicture,
};