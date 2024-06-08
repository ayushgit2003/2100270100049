const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const productRoutes = require("./router");

// Configure CORS to allow requests from your frontend origin
const corsOptions = {
  origin: "http://localhost:5173", // Update this to match your frontend's origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
