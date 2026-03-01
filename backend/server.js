import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/url", urlRoutes);

const PORT = process.env.PORT || 5000;
// Use 0.0.0.0 to allow connections from mobile devices on the same network
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Server running on port ${PORT}`),
);
