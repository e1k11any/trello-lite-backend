const Activity = require("../api/models/Activity");

const createActivityLog = async (user, text, boardId) => {
  try {
    await Activity.create({
      text,
      user: user._id,
      board: boardId,
    });
  } catch (error) {
    // We log the error but don't stop the main operation
    console.error("Failed to create activity log:", error);
  }
};

module.exports = createActivityLog;
