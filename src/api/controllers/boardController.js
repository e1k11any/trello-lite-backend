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
      user: req.user._id, // Assign the logged-in user's ID
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
    // In the getAllBoards function in boardController.js
    // Find only the boards where the 'user' field matches the logged-in user's ID
    const boards = await Board.find({ user: req.user._id });
    res.status(200).json(boards);
  } catch (error) {
    // If anything goes wrong, send a 500 status
    res
      .status(500)
      .json({ message: "Error fetching boards", error: error.message });
  }
};

// @desc    Get a single board by ID
// @route   GET /api/boards/:id
// @access  Public (for now)
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching board", error: error.message });
  }
};

// @desc    Update a board
// @route   PUT /api/boards/:id
// @access  Public (for now)
const updateBoard = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // This option returns the modified document rather than the original
        runValidators: true, // This ensures that updates are validated against the schema
      }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(updatedBoard);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating board", error: error.message });
  }
};

// @desc    Delete a board
// @route   DELETE /api/boards/:id
// @access  Public (for now)
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // A 200 status is fine, or a 204 (No Content) status is also common for deletes
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting board", error: error.message });
  }
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};
