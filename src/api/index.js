const express = require("express");
const boardRoutes = require("./routes/boardRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/api-docs.html"));
});

router.use("/boards", boardRoutes);
router.use("/users", userRoutes);

module.exports = router;
