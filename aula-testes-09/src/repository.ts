import prisma from "./database";

import { User } from "@prisma/client";

export type UserInput = Omit<User, "id">;

export function getUsers() {
  return prisma.user.findMany({
    select: {
      email: true
    }
  });
}

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  })
}

export function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } })
}

export function createUser(user: UserInput) {
  return prisma.user.create({ data: user });
}

export function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}

export function updateUser(id: number, userData: UserInput) {
  return prisma.user.update({
    where: { id },
    data: userData
  })
}