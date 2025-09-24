const List = require("../models/List");
const Board = require("../models/Board"); // We need this to verify the parent board exists
const createActivityLog = require("../../utils/createActivityLog");

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
    await createActivityLog(
      req.user,
      `added '${newList.name}' to this board`,
      boardId
    );

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

// @desc    Get a single list by ID
// @route   GET /api/boards/:boardId/lists/:listId
const getListById = async (req, res) => {
  try {
    const { listId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching list", error: error.message });
  }
};

// @desc    Update a list's name
// @route   PUT /api/boards/:boardId/lists/:listId
const updateList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name } = req.body;

    const updatedList = await List.findByIdAndUpdate(
      listId,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json(updatedList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating list", error: error.message });
  }
};

// @desc    Delete a list
// @route   DELETE /api/boards/:boardId/lists/:listId
const deleteList = async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.listId);

    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting list", error: error.message });
  }
};

module.exports = {
  createList,
  getListsByBoard,
  getListById,
  updateList,
  deleteList,
};
