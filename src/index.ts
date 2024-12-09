import { OAuth2Client } from "google-auth-library";
import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ["http://localhost:5173", "http://fxn-m.com"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());


const CLIENT_ID =
  "146729163411-9j93smr5d0mq2g6ki6l8ifjipvuk6474.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

app.post("/verify-token", async (req, res) => {
  const { google_token } = req.body;

  if (!google_token) {
    res.status(400).json({ error: "Google token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (payload) {
      const { email, name, picture, sub } = payload;
      res.status(200).json({
        success: true,
        message: "Token is valid",
        user: {
          id: sub,
          name,
          email,
          picture,
        },
      });
    } else {
      res.status(401).json({ error: "Failed to retrieve payload from token" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
