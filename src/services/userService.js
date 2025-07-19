const UserRepository = require('../repositories/userRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(userId, updateData) {
    const { firstName, lastName, phone, address, education, experience, skills, friendCategories } = updateData;
    
    const updatedUser = await this.userRepository.update(userId, {
      firstName,
      lastName,
      phone,
      address,
      education,
      experience,
      skills,
      friendCategories: friendCategories || [],
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async updateProfileImage(userId, imagePath) {
    const updatedUser = await this.userRepository.update(userId, {
      profileImageUrl: imagePath,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  createFullImageUrl(req, path) {
    if (!path || path.startsWith('http')) {
      return path;
    }
    const apiBaseUrl = process.env.API_BASE_URL || `${req.protocol}://${req.get('host')}`;
    return `${apiBaseUrl}${path}`;
  }
}

module.exports = UserService;