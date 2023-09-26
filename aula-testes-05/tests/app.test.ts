import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })

  it("should return 400 when elements is not a number", async () => {
    const invalidQueries = ["aaa", "xyz", "123abc", "text", ""];
    
    for (const query of invalidQueries) {
      const parsedQuery = Number(query);

      const result = await api.get(`/fibonacci?elements=${parsedQuery}`);
      
      if (isNaN(parsedQuery)) {
        expect(result.status).toBe(400);
        expect(result.text).toBe("Bad Request");
      }
    }
  });

  it("should return 400 when elements is < 1", async () => {
    const invalidQueries = [0, -1, -20, -670078];
    
    for (const query of invalidQueries) {
      
      const result = await api.get(`/fibonacci?elements=${query}`);
      
      if (query < 1) {
        expect(result.status).toBe(400);
        expect(result.text).toBe("Bad Request");
      }
    }
  });

  it("should return 400 when elements is higher than MAX.VALUE", async () => {
    const invalidQueries = [1.80e+308];
    
    for (const query of invalidQueries) {
      
      const result = await api.get(`/fibonacci?elements=${query}`);
      
      if (query > Number.MAX_VALUE) {
        expect(result.status).toBe(400);
        expect(result.text).toBe("Bad Request");
      }
    }
  });
  
  it("should return 200 when elements is a number", async () => {
    const validQueries = [2, 3, 1, 57, 90, 8833849];
    
    for (const query of validQueries) {
      const parsedQuery = Number(query);

      const result = await api.get(`/fibonacci?elements=${parsedQuery}`);
      
      if (typeof(parsedQuery) === "number") {
        expect(result.status).toBe(200);
      }
    }
  });

})