const express = require("express");
const router = express.Router();

const {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");

// Routes for getting all boards and creating a new board
router.route("/").get(getAllBoards).post(createBoard);

// Routes for getting, updating, and deleting a single board by its ID
router.route("/:id").get(getBoardById).put(updateBoard).delete(deleteBoard);

module.exports = router;
