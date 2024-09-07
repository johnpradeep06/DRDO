import prisma from './prismaClient.js';

export const checkDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
};
