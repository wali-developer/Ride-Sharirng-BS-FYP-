const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

var users = [];

const addUser = (userId, socketId) => {
  // !users.some((user) => user.user.Id === userId) &&
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

//find message receiverId
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when user connect
  console.log("a user connected...");

  //take userID and socketID and add to users array
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", { senderId, text });
  });

  //when user disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected...");

    //user disconnects, remove from users array
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
