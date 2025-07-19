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

const testDatabaseConnection = async () => {
  try {
    const client = getPrismaClient();
    await client.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

module.exports = {
  getPrismaClient,
  disconnectPrisma,
  testDatabaseConnection,
};