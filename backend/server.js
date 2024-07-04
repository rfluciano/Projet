const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

const attachSocket = (req,res,next) => {
  req.io = io;
  next();
};


app.use(attachSocket);

// CORS configuration using the 'cors' middleware
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const router = require("./routes/membresRouter.js");
app.use("/api", router);

const annonce = require("./routes/annoncesRouter.js");
app.use("/api", annonce);

const reservation = require("./routes/reservationsRouter.js");
app.use("/api", reservation);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit('response2', {message: "mety pory"});

  socket.emit("testEvent", { message: "Hello from server!" });

  socket.on("message", (data) => {
    console.log("Received message from client:", data);
    socket.emit("response", { message: "Message received" });
  });

  

  socket.on("userLoggedIn", (userData) => {
    console.log("User logged in:", userData);
    const { firstName, token } = userData;
    socket.emit("userData", { firstName, token });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Testing API
app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

// Port
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
