import express from "express";
import { db } from "../Database/db.js";

const router = express.Router();

router.get("/api/recipes/daftar/bahan", (req, res) => {
  const query = "SELECT * FROM ingredients_new";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, data: results });
  });
});

router.get("/api/recipes", (req, res) => {
  const query = "SELECT * FROM resep_new";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, data: results });
  });
});

export default router;
