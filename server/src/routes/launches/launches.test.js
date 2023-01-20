const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("it should responde with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    //expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /launches", () => {
  const launchDataCorrect = {
    mission: "SC-001",
    rocket: "SC BaseRocket T01",
    target: "Kepler-186 f",
    launchDate: "December 01, 2023",
  };

  const launchDataWithoutDate = {
    mission: "SC-001",
    rocket: "SC BaseRocket T01",
    target: "Kepler-186 f",
  };

  const launchDataWithInvalidDate = {
    mission: "SC-001",
    rocket: "SC BaseRocket T01",
    target: "Kepler-186 f",
    launchDate: "wrong date",
  };

  test("it should responde with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
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
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  test("it should catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
