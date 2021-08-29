const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const messages = [];
io.on("connection", (socket) => {
  messages.forEach((message) => socket.emit("chat", message));

  socket.on("chat", (args) => {
    socket.broadcast.emit("chat", args);
    messages.push(args);
  });
});

httpServer.listen(3001);
