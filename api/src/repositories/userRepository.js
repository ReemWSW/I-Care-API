const { getPrismaClient } = require('../config/database');

class UserRepository {
  constructor() {
    this.prisma = getPrismaClient();
  }

  async create(userData) {
    return await this.prisma.user.create({
      data: userData,
    });
  }

  async findById(id) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username) {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }

  async update(id, updateData) {
    return await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(email, username) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });
    return !!user;
  }
}

module.exports = UserRepository;