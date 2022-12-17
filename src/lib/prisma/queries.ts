import prisma from './prisma';

export async function getUsers() {
  const users = await prisma.test.findMany();
  return users;
}