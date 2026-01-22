const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
const weightRoutes = require("./routes/weightRoutes");
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.get("/", (req, res) => {
  res.send("Weight Loss Api working");
});

app.use("/api/auth", authRoutes);

app.use("/api/weights", weightRoutes);
module.exports = app;
