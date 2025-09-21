// src/api/routes/listRoutes.js
const express = require("express");
const {
  createList,
  getListsByBoard,
  getListById,
  updateList,
  deleteList,
} = require("../controllers/listController");

// VERY IMPORTANT: We need to enable 'mergeParams' for the router
// This allows us to access parameters from parent routers (e.g., :boardId)
const router = express.Router({ mergeParams: true });

// Routes for the collection of lists (on a specific board)
router.route("/").post(createList).get(getListsByBoard);

// Routes for a single list
router.route("/:listId").get(getListById).put(updateList).delete(deleteList);

module.exports = router;
