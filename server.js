const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Trello-Lite API is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on http://localhost:${PORT}`);
});
