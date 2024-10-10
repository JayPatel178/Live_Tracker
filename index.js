const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("app");
});

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("recive-location", { id: socket.id, ...data });
  });
  console.log("Connect");

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port no: ${process.env.PORT || 3000}`);
});
