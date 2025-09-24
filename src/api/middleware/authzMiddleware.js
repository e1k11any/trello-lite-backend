const Board = require("../models/Board");

const checkBoardMembership = async (req, res, next) => {
  try {
    const boardId = req.params.id || req.params.boardId; // Handle different param names
    const userId = req.user._id;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const member = board.members.find((m) => m.user.equals(userId));

    if (!member) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not a member of this board" });
    }

    // Attach board and membership info to the request for later use in controllers
    req.board = board;
    req.membership = member;

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error during authorization" });
  }
};

module.exports = { checkBoardMembership };
