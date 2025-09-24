let io;

const initializeSocket = (server) => {
  io = new (require("socket.io").Server)(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);
    socket.on("joinBoard", (boardId) => {
      socket.join(boardId);
      console.log(`User ${socket.id} joined board room ${boardId}`);
    });
    socket.on("disconnect", () => {
      console.log("❌ A user disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIO };
