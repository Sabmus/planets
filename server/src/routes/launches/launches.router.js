const express = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  htppAbortLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", htppAbortLaunch);

module.exports = launchesRouter;
