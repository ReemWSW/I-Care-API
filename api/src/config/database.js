const { PrismaClient } = require('@prisma/client');

let prisma;

const createPrismaClient = () => {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }
  return prisma;
};

const getPrismaClient = () => {
  if (!prisma) {
    return createPrismaClient();
  }
  return prisma;
};

const disconnectPrisma = async () => {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
  }
};

module.exports = {
  getPrismaClient,
  disconnectPrisma,
};