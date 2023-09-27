import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  
  it("should create a user", async () => {
    const { status } = await api.post("/users").send({
      email: "juliana@gmail.com",
      password: "123456",
    });

    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    //cenário
    await prisma.user.create({
      data: {
        email: "juliana@gmail.com",
        password: "123456",
      },
    });

    const { status, text } = await api.post("/users").send({
      email: "juliana@gmail.com",
      password: "789012",
    });

    expect(status).toBe(409);
    expect(text).toBe('Conflict')
  });
});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    //cenário
    const user = await prisma.user.create({
      data: {
        email: "juliana@gmail.com",
        password: "123456"
      }
    })

    const {status, body} = await api.get(`/users/${user.id}`);
    expect(status).toBe(200)
    expect(body).toEqual({
      id: user.id,
      email: "juliana@gmail.com",
      password: "123456"
    })

  });

  it("should return 404 when can't find a user by id", async () => {
    //cenário
    const user = await prisma.user.create({
      data: {
        email: "juliana@gmail.com",
        password: "123456"
      }
    })

    const {status, text} = await api.get(`/users/${user.id + 1}`);
    expect(status).toBe(404)
    expect(text).toBe('Not Found')

  });

  it("should return all users", async () => {
    //cenário
    await prisma.user.create({
      data: {
        email: "juliana@gmail.com",
        password: "123456",
      },
    });

    await prisma.user.create({
      data: {
        email: "bruno@gmail.com",
        password: "1234567",
      },
    });

    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String),
        }),
      ])
    );
  });
});
