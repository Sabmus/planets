const http = require("http");
const mongoose = require("mongoose");

require("dotenv").config();

const app = require("./app");
const { loadPlanetsData, planets } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

const server = http.createServer(app);

// deprecation warning from Mongoose 7
mongoose.set("strictQuery", false);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  // we wait until the planets data is fully loaded, then the server can start;
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });
}

startServer();
