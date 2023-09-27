import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";
import { AccessInput } from "../src/repository";

const api = supertest(app);

beforeEach(async () => {
  await prisma.access.deleteMany();
});

describe("POST /accesses tests", () => {
  it("should create an access", async () => {
    const access: AccessInput = {
      username: "teste@teste.com.br",
    };

    const { status, body } = await api.post("/accesses").send(access);
    expect(status).toBe(201);
    expect(body).toEqual({
      token: expect.any(String)
    });
  });
});

describe("GET /accesses tests", () => {
  it("should return all users", async () => {
    const accessData: AccessInput = {
      username: "teste@teste.com.br",
    };

    await prisma.access.createMany({
      data: [{
        ...accessData,
        date: new Date(),
        ip: "127.0.0.1",
        token: "crazy-token"
      },
      {
        ...accessData,
        date: new Date(),
        ip: "127.0.0.1",
        token: "crazy-token-2"
      }]
    });

    const { status, body } = await api.get("/accesses");
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        ip: expect.any(String),
        username: expect.any(String),
        date: expect.any(String),
        token: expect.any(String)
      })
    ]))
  });

})