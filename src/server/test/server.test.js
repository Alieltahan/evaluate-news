import "babel-polyfill";
const request = require("supertest");

let server;

describe("Server Side", () => {
  // to Start the server & close it before & after each suit.
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should return the client index.html", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
    it("GET /ABC", async () => {
      const res = await request(server).get("/ABC");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /evaluate_news", () => {
    it("Sending valid Article", async () => {
      const ArticleURL = `https://reactresources.com/articles`;
      const res = await request(server).post("/evaluate_news").send(ArticleURL);
      expect(res.status).toBe(200);
    });
  });
});
