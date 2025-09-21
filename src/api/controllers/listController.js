// src/api/controllers/listController.js
const List = require("../models/List");
const Board = require("../models/Board"); // We need this to verify the parent board exists

// @desc    Create a new list for a specific board
// @route   POST /api/boards/:boardId/lists
const createList = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { name } = req.body;

    // First, check if the board exists
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const newList = await List.create({
      name,
      board: boardId, // Link the list to the board
    });

    res.status(201).json(newList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating list", error: error.message });
  }
};

// @desc    Get all lists for a specific board
// @route   GET /api/boards/:boardId/lists
const getListsByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const lists = await List.find({ board: boardId });
    res.status(200).json(lists);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching lists", error: error.message });
  }
};

module.exports = {
  createList,
  getListsByBoard,
};
