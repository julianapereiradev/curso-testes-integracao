import prisma from "./database";

export type AccessInput = {
  username: string
}

export function getAccesses() {
  return prisma.access.findMany();
}

export function registerAccess(ip: string, username: string, token: string) {
  return prisma.access.create({
    data: {
      ip,
      username,
      token,
      date: new Date(),
    }
  })
}