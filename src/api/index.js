const express = require("express");
const boardRoutes = require("./routes/boardRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

router.use("/boards", boardRoutes);

module.exports = router;
