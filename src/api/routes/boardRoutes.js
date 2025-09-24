const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkBoardMembership } = require("../middleware/authzMiddleware");

const listRouter = require("./listRoutes");

const {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  addMemberToBoard,
} = require("../controllers/boardController");

// Routes for getting all boards and creating a new board
router.route("/").get(protect, getAllBoards).post(protect, createBoard);

// Routes for getting, updating, and deleting a single board by its ID
router
  .route("/:id")
  .get(protect, checkBoardMembership, getBoardById)
  .put(protect, checkBoardMembership, updateBoard)
  .delete(protect, checkBoardMembership, deleteBoard);

router
  .route("/:id/members")
  .post(protect, checkBoardMembership, addMemberToBoard);

router.use("/:boardId/lists", protect, checkBoardMembership, listRouter);
module.exports = router;
