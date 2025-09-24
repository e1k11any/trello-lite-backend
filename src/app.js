const express = require("express");
const api = require("./api"); // Import the main API router

const app = express();
app.use(express.json());

app.use("/api", api);

// Add a root route for a welcome message
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the Trello-Lite API</h1><p>Your API is live and running. Use /api to access the routes.</p>"
  );
});

module.exports = app;
