module.exports = (app, server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log(`socket connected with id ${socket.id}`);
  });

  return io;
};
