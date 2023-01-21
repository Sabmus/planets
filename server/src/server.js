const http = require("http");

const { mongoConnect } = require("./services/mongo");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  // we wait until the planets data is fully loaded, then the server can start;
  await mongoConnect();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });
}

startServer();
