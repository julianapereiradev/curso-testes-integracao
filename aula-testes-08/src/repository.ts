import prisma from "./database";

import { Reservation } from "@prisma/client";

export type ReservationInput = Omit<Reservation, "id">;

export function getReservations() {
  return prisma.reservation.findMany();
}

export function createReservation(reservation: ReservationInput) {
  return prisma.reservation.create({
    data: reservation
  });
}
