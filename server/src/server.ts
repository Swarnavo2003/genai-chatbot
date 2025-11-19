import express from "express";
import cors from "cors";
import { loadEnv } from "./env";
import { askStructured } from "./ask-core";

loadEnv();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { query } = req.body;
    console.log("Received query:", query);
    if (!query || !String(query).trim()) {
      return res.status(400).json({ error: "Query is required" });
    }

    const out = await askStructured(query);
    console.log("Structured output:", out);

    return res.status(200).json(out);
  } catch (error) {
    return res.status(500).json({ error: "Failed to answer" });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
