import express from "express";
import {verifyToken} from "../controllers/auth";

const app = express();
app.use(express.json());

app.post("/verify-token", verifyToken);

export default app;