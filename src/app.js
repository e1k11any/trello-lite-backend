const express = require("express");
const api = require("./api"); // Import the main API router

const app = express();

app.use("/api", api);

module.exports = app;
