const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

// deprecation warning from Mongoose 7
mongoose.set("strictQuery", false);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
