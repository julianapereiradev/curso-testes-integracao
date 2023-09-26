import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("API test", async () => {
    const result = await api.get("/event");

    expect(result.status).toBe(200);
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(result.body).toEqual(
      {
        id: expect.any(Number),
        title: expect.any(String),
        image: expect.any(String),
        date: expect.stringMatching(dateRegex)
      }
    );
  });
});
