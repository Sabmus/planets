//const fs = require("fs");
//const path = require("path");
const http = require("http");

const { mongoConnect } = require("./services/mongo");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");

const PORT = process.env.PORT || 8000; //443

const server = http.createServer(app);

async function startServer() {
  // we wait until the planets data is fully loaded, then the server can start;
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });
}

startServer();
