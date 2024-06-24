// src/deskripsi.js (assuming this is your backend setup)
import express from "express";
import cors from "cors";
import { db } from "../Database/db.js"; // Assuming this imports your database connection

const app = express();
app.use(cors());

// Endpoint to retrieve recipe by ID
app.get("/api/recipes/:id", (req, res) => {
  const recipeId = req.params.id;
  console.log(`Request received for recipe ID: ${recipeId}`);

  const sql = "SELECT * FROM resep_new WHERE id = ?";
  db.query(sql, [recipeId], (err, result) => {
    if (err) {
      console.error("Error retrieving recipe from database:", err);
      res.status(500).json({ error: "Error retrieving recipe from database" });
    } else {
      if (result.length > 0) {
        console.log("Recipe found:", result[0]);
        res.json(result[0]);
      } else {
        console.log("Recipe not found3");
        res.status(404).json({ error: "Recipe not found3" });
      }
    }
  });
});

app.get("/api/recipes/ingridient/:id", (req, res) => {
  const recipeId = req.params.id;
  console.log(`Request received for recipe ID: ${recipeId}`);

  const sql = "SELECT * FROM ingredients_new WHERE resep_id = ?";
  db.query(sql, [recipeId], (err, result) => {
    if (err) {
      console.error("Error retrieving recipe from database:", err);
      res.status(500).json({ error: "Error retrieving recipe from database" });
    } else {
      if (result.length > 0) {
        console.log("Recipe found:", result);
        res.json(result);
      } else {
        console.log("Recipe not found2");
        res.status(404).json({ error: "Recipe not found2" });
      }
    }
  });
});

app.get("/api/recipes/daftar/bahan", (req, res) => {
  const sql = "SELECT * FROM ingredients_new GROUP BY ingredient_name";
  db.query(sql, [], (err, result) => {
    console.log(result);
    if (err) {
      console.error("Error retrieving recipe from database:", err);
      res.status(500).json({ error: "Error retrieving recipe from database" });
    } else {
      if (result.length > 0) {
        console.log("Recipe found:", result);
        res.json(result);
      } else {
        console.log("Recipe not found1", err);
        res.status(404).json({ error: "Recipe not found2" });
      }
    }
  });
});

app.post("/api/recipes/daftar/caribahan", (req, res) => {
  const ingredients = req.body.bahan;

  console.log(ingredients);

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "Ingredients are required" });
  }

  const inList = ingredients.map((ingredient) => `'${ingredient}'`).join(", ");
  const countNumber = ingredients.length;

  console.log(inList);
  console.log(countNumber);

  const sql = `
    SELECT r.id, r.recipe_title, r.img, r.deskripsi
    FROM resep_new r
    JOIN ingredients_new i ON i.resep_id = r.id
    WHERE i.ingredient_name IN (${inList})
    GROUP BY r.id
    HAVING COUNT(DISTINCT i.ingredient_name) = ${countNumber};
  `;

  db.query(sql, [], (err, result) => {
    if (err) {
      console.error("Error retrieving recipe from database:", err);
      return res.status(500).json({ error: "Error retrieving recipe from database" });
    }
    if (result.length > 0) {
      console.log("Recipe found:", result);
      return res.status(200).json(result);
    } else {
      console.log("Recipe not found");
      return res.status(404).json({ error: "Resep tidak ditemukan dengan bahan yang dipilih." });
    }
  });
});

app.post('/api/recipes/searchrecipes', (req, res) => {
  const { recipeTitle } = req.body;
  const { directions } = req.body;
  const sql = `SELECT r.id FROM resep_new r WHERE r.recipe_title LIKE '%${recipeTitle}%' OR r.directions LIKE '%${directions}%' LIMIT 1`;
  db.query(sql, [], (err, result) => {
    if (err) {
      console.error('Error retrieving recipe from database:', err);
      res.status(500).json({ error: 'Error retrieving recipe from database' });
    } else {
      if (result.length > 0) {
        console.log('Recipe found:', result);
        res.json(result);
      } else {
        console.log('Recipe not found1', err);
        res.status(404).json({ error: 'Resep tidak ditemukan dengan bahan yang dipilih.' });
      }
    }
  });
});

export default app;
