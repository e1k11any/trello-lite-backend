const Card = require("../models/Card");
const List = require("../models/List");

// @desc    Create a card for a specific list
// @route   POST /api/boards/:boardId/lists/:listId/cards
const createCard = async (req, res) => {
  try {
    const { listId, boardId } = req.params;
    const { name, description } = req.body;

    // Check if the parent list exists
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const newCard = await Card.create({
      name,
      description,
      list: listId,
      board: boardId,
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all cards for a specific list
// @route   GET /api/boards/:boardId/lists/:listId/cards
const getCardsByList = async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await Card.find({ list: listId });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single card by ID
// @route   GET /api/boards/:boardId/lists/:listId/cards/:cardId
const getCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a card
// @route   PUT /api/boards/:boardId/lists/:listId/cards/:cardId
const updateCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(cardId, req.body, {
      new: true,
    });
    if (!updatedCard)
      return res.status(404).json({ message: "Card not found" });
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a card
// @route   DELETE /api/boards/:boardId/lists/:listId/cards/:cardId
const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    if (!deletedCard)
      return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCard,
  getCardsByList,
  getCardById,
  updateCard,
  deleteCard,
};
