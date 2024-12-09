import authRoutes from "./routes/auth"
import cors from "cors";
import express from "express";
// import notebookRoutes from "./routes/notebooks"

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://fxn-m.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
// app.use("/notebooks", notebookRoutes)

export default app;