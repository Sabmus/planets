const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("it should responde with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      //expect(response.statusCode).toBe(200);
    });
  });

  describe("Test POST /launches", () => {
    const launchDataCorrect = {
      mission: "SC-001",
      rocket: "SC BaseRocket T01",
      target: "Kepler-1410 b",
      launchDate: "December 01, 2023",
    };

    const launchDataWithoutDate = {
      mission: "SC-001",
      rocket: "SC BaseRocket T01",
      target: "Kepler-1410 b",
    };

    const launchDataWithInvalidDate = {
      mission: "SC-001",
      rocket: "SC BaseRocket T01",
      target: "Kepler-1410 b",
      launchDate: "wrong date",
    };

    test("it should responde with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataCorrect)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(launchDataCorrect.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("it should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
    test("it should catch invalid date", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
