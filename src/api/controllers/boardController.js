const Board = require("../models/Board");

// @desc    Create a new board
// @route   POST /api/boards
// @access  Public (for now)
const createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Check if a name was provided
    if (!name)
      return res.status(400).json({ message: "Board name is required." });

    const newBoard = await Board.create({
      name,
      description,
    });
    // Respond with a 201 (Created) status and the new board data
    res.status(201).json(newBoard);
  } catch (error) {
    // If anything goes wrong, send a 500 (Internal Server Error) response
    res
      .status(500)
      .json({ message: "Error creating board", error: error.message });
  }
};

// @desc    Get all boards
// @route   GET /api/boards
// @access  Public (for now)
const getAllBoards = async (req, res) => {
  try {
    // Use the Board model to find all board documents in the database
    const boards = await Board.find({});

    // Respond with a 200 (OK) status and the array of boards
    res.status(200).json(boards);
  } catch (error) {
    // If anything goes wrong, send a 500 status
    res
      .status(500)
      .json({ message: "Error fetching boards", error: error.message });
  }
};

// Export the functions so our routes can use them
module.exports = {
  createBoard,
  getAllBoards,
};
