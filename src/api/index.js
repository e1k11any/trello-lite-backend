const express = require("express");
const boardRoutes = require("./routes/boardRoutes");
const userRoutes = require("./routes/userRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

router.use("/boards", boardRoutes);
router.use("/users", userRoutes);

module.exports = router;
