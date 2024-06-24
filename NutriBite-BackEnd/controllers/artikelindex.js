import express from "express";
import { db } from "../Database/db.js";

const router = express.Router();

router.get("/api/artikelindex", (req, res) => {
  const query = "SELECT * FROM artikel WHERE user_id IS NULL";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, data: results });
  });
});

// Endpoint to retrieve recipe by ID
router.get("/api/artikel/:id", (req, res) => {
  const artikelId = req.params.id;
  console.log(`Request received for recipe ID: ${artikelId}`);

  const sql = "SELECT * FROM artikel WHERE id = ?";
  db.query(sql, [artikelId], (err, result) => {
    if (err) {
      console.error("Error retrieving recipe from database:", err);
      res.status(500).json({ error: "Error retrieving recipe from database" });
    } else {
      if (result.length > 0) {
        console.log("Recipe found:", result[0]);
        res.json(result[0]);
      } else {
        console.log("Recipe not found3");
        res.status(404).json({ error: "Recipe not found33" });
      }
    }
  });
});

export default router;
