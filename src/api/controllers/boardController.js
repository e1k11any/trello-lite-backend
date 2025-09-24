const Board = require("../models/Board");
const User = require("../models/User");
const createActivityLog = require("../../utils/createActivityLog");
const Activity = require("../models/Activity"); // Import the Activity model

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
      owner: req.user._id, // Set the owner
      members: [{ user: req.user._id, role: "admin" }], // Add owner as an admin
    });
    await createActivityLog(req.user, `created this board`, newBoard._id);

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
    // CORRECTED: Find all boards where the logged-in user's ID
    // exists in the 'user' field inside the 'members' array.
    const boards = await Board.find({ "members.user": req.user._id });

    res.status(200).json(boards);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching boards", error: error.message });
  }
};

// @desc    Get a single board by ID
// @route   GET /api/boards/:id
// @access  Public (for now)
// const getBoardById = async (req, res) => {
//   try {
//     const board = await Board.findById(req.params.id);
//     if (!board) {
//       return res.status(404).json({ message: "Board not found" });
//     }
//     res.status(200).json(board);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching board", error: error.message });
//   }
// };
const getBoardById = async (req, res) => {
  // The board is already fetched by the middleware and attached to req.board
  res.status(200).json(req.board);
};

// @desc    Update a board
// @route   PUT /api/boards/:id
// @access  Public (for now)
const updateBoard = async (req, res) => {
  if (req.membership.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only admins can update the board" });
  }
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
  if (!req.board.owner.equals(req.user._id)) {
    return res
      .status(403)
      .json({ message: "Forbidden: Only the board owner can delete it" });
  }
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

// @desc    Add a member to a board
// @route   POST /api/boards/:id/members
// @access  Private (Admins only)
const addMemberToBoard = async (req, res) => {
  try {
    // 1. Authorization: Check if the current user is an admin of this board.
    //    The 'req.membership' object was attached by our authzMiddleware.
    if (req.membership.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins can add members" });
    }

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide a user email" });
    }

    // 2. Find the user to be added by their email
    const userToAdd = await User.findOne({ email: email.toLowerCase() });
    if (!userToAdd) {
      return res
        .status(404)
        .json({ message: "User with that email not found" });
    }

    // 3. Check if the user is already a member of the board
    const isAlreadyMember = req.board.members.some((m) =>
      m.user.equals(userToAdd._id)
    );

    if (isAlreadyMember) {
      return res
        .status(400)
        .json({ message: "User is already a member of this board" });
    }

    // 4. Add the new member and save the board
    req.board.members.push({ user: userToAdd._id, role: "member" }); // role is 'member' by default
    await req.board.save();

    // To provide a useful response, we can populate the user details for the members list
    const updatedBoard = await Board.findById(req.board._id).populate(
      "members.user",
      "name email"
    );
    await createActivityLog(
      req.user,
      `added ${userToAdd.name} to this board`,
      req.board._id
    );

    res.status(200).json(updatedBoard.members);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding member", error: error.message });
  }
};

const getBoardActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ board: req.board._id })
      .sort({ createdAt: -1 }) // Show newest first
      .populate("user", "name"); // Replace user ID with user's name

    res.status(200).json(activities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching activities", error: error.message });
  }
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  addMemberToBoard,
  getBoardActivities,
};
