const express = require("express");
const router = express.Router();

const listRouter = require("./listRoutes");

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

// MOUNT the list router on the specific path
// Any request to /:boardId/lists will be forwarded to our listRouter
router.use("/:boardId/lists", listRouter);
module.exports = router;
