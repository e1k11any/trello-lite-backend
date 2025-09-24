const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
      },
    ],

    // A board must have a name.
    name: {
      type: String,
      required: [true, "A board must have a name."], // This field is required.
      trim: true, // Automatically removes leading/trailing whitespace.
      maxlength: [50, "Board name cannot be more than 50 characters."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot be more than 200 characters."],
    },
    // Later, we will add references to Users, Lists, and Cards here.
  },
  {
    // Schema options
    // The timestamps option automatically adds `createdAt` and `updatedAt` fields.
    timestamps: true,
  }
);

// A Model is a wrapper on the Schema that provides an interface
// for creating, querying, updating, and deleting documents.
// Mongoose will automatically create a collection named 'boards' (plural and lowercase).
const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
