// src/api/routes/listRoutes.js
const express = require("express");
const {
  createList,
  getListsByBoard,
} = require("../controllers/listController");

// VERY IMPORTANT: We need to enable 'mergeParams' for the router
// This allows us to access parameters from parent routers (e.g., :boardId)
const router = express.Router({ mergeParams: true });

router.route("/").post(createList).get(getListsByBoard);

module.exports = router;
