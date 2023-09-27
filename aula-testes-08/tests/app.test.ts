import supertest from "supertest";

import app from "./../src/app";
import { ReservationInput } from "../src/repository";
import prisma from "database";

const api = supertest(app);

beforeAll(async () => {
  await prisma.reservation.deleteMany();
})


describe("API test", () => {
  it("should create a reservation", async () => {
    const reservation: ReservationInput = {
      startDate: new Date(),
      endDate: new Date()
    };

    const { status } = await api.post("/reservations").send(reservation);
    expect(status).toBe(201);
  });

  it("should return all reservations", async () => {
    const { status, body } = await api.get("/reservations");
    expect(status).toBe(200);
    expect(body).toHaveLength(1);
  });
});