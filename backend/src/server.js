const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Register movie routes
app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🚀 CineSuggest Backend is Running Successfully!"
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Keep event loop active in background runners
setInterval(() => {}, 60000);
