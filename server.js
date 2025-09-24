// server.js (at the root)
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io"); // 2. Import Server from socket.io
const { initializeSocket } = require("./src/socket"); // Import our function

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const server = http.createServer(app);
initializeSocket(server); // Initialize Socket.IO

// 4. Create a new Socket.IO server and attach it to the HTTP server
const io = new Server(server, {
  // Configure CORS for Socket.IO
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// We'll put our socket logic here for now
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for a user joining a specific board's "room"
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(`User ${socket.id} joined board room ${boardId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
