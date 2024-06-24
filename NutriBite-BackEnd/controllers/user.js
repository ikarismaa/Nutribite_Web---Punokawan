import express from "express";
import { db } from "../Database/db.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import multer from "multer";
import { promisify } from "util";

const router = express.Router();

const unlinkAsync = promisify(fs.unlink);
const queryAsync = promisify(db.query).bind(db);

const storageProf = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profilepic");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const storageArticles = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/articles");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadProf = multer({ storage: storageProf });
const uploadArtikel = multer({ storage: storageArticles });

router.get("/api/users/current", async (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const authToken = authorization.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const query = "SELECT * FROM users WHERE id = ?";

    const decodedToken = jwt.verify(authToken, "rahasia-rahasia");
    const userId = decodedToken.userId;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const user = results[0];
      delete user.password;
      user.profil_pic = "http://localhost:3000/uploads/profilepic/" + user.profil_pic;
      res.json({ success: true, user });
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/api/users/current/profilepic", uploadProf.single("profilePic"), async (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ success: false, message: "Unauthorized" });

  const authToken = authorization.split(" ")[1];
  if (!authToken) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decodedToken = jwt.verify(authToken, "rahasia-rahasia");
    const userId = decodedToken.userId;

    const query = "SELECT * FROM users WHERE id = ?";
    const results = await queryAsync(query, [userId]);

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = results[0];
    const oldProfilePic = user.profil_pic;

    if (oldProfilePic !== "default.webp") {
      await unlinkAsync(`uploads/profilepic/${oldProfilePic}`);
    }

    const profilePic = req.file.filename;
    const updateQuery = "UPDATE users SET profil_pic = ? WHERE id = ?";
    await queryAsync(updateQuery, [profilePic, userId]);

    res.json({
      success: true,
      message: "Profile picture updated successfully",
      profilePicUrl: `http://localhost:3000/uploads/profilepic/${profilePic}`,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/api/users/current/saved-food", async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ success: false, message: "Unauthorized" });

    const authToken = authorization.split(" ")[1];
    if (!authToken) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decodedToken = jwt.verify(authToken, "rahasia-rahasia");
    const userId = decodedToken.userId;

    const query = "SELECT resep_new.* FROM saved_foods INNER JOIN resep_new ON saved_foods.food_id = resep_new.id WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }

      res.json({ success: true, savedFoods: results });
    });
  } catch (error) {
    console.error("Error getting saved foods:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/api/users/current/saved-food", async (req, res) => {
  try {
    // Check if authorization header is provided
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ success: false, message: "Unauthorized" });

    // Check if authToken is provided
    const authToken = authorization.split(" ")[1];
    if (!authToken) return res.status(401).json({ success: false, message: "Unauthorized" });

    // Check if foodId is provided
    if (!req.body.foodId) return res.status(400).json({ success: false, message: "foodId is required" });
    const { foodId } = req.body;

    // Check if foodId is a number
    if (isNaN(foodId)) return res.status(400).json({ success: false, message: "Invalid foodId" });

    // Verify JWT token and get userId
    const decodedToken = jwt.verify(authToken, "rahasia-rahasia");
    const userId = decodedToken.userId;

    // Check if foodId exists in the database
    const foodQuery = "SELECT * FROM resep_new WHERE id = ? LIMIT 1";
    db.query(foodQuery, [foodId], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "Internal server error" });

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "Food not found" });
      }

      // Check if food is already saved
      const checkQuery = "SELECT * FROM saved_foods WHERE user_id = ? AND food_id = ?";
      db.query(checkQuery, [userId, foodId], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Internal server error" });

        if (results.length > 0) {
          return res.status(400).json({ success: false, message: "Food already saved" });
        }

        // Save the food
        const saveQuery = "INSERT INTO saved_foods (user_id, food_id) VALUES (?, ?)";
        db.query(saveQuery, [userId, foodId], (err, results) => {
          if (err) return res.status(500).json({ success: false, message: "Internal server error" });
          res.json({ success: true, message: "Food saved successfully" });
        });
      });
    });
  } catch (error) {
    console.error("Error saving food:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/api/users/current/fav-food", async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ success: false, message: "Unauthorized" });

    const authToken = authorization.split(" ")[1];
    if (!authToken) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decodedToken = jwt.verify(authToken, "rahasia-rahasia");
    const userId = decodedToken.userId;

    const query = "SELECT resep_new.* FROM fav_foods INNER JOIN resep_new ON fav_foods.food_id = resep_new.id WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }

      res.json({ success: true, favFoods: results });
    });
  } catch (error) {
    console.error("Error getting fav foods:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/api/users/current/fav-food", async (req, res) => {
  try {
    // Check if authorization header is provided
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ success: false, message: "Unauthorized" });

    // Check if authToken is provided
    const authToken = authorization.split(" ")[1];
    if (!authToken) return res.status(401).json({ success: false, message: "Unauthorized" });

    // Check if foodId is provided
    if (!req.body.foodId) return res.status(400).json({ success: false, message: "foodId is required" });
    const { foodId } = req.body;

    // Check if foodId is a number
    if (isNaN(foodId)) return res.status(400).json({ success: false, message: "Invalid foodId" });

    // Verify JWT token and get userId
    const decodedToken = jwt.verify(authToken, "rahasia-rahasia");
    const userId = decodedToken.userId;

    // Check if foodId exists in the database
    const foodQuery = "SELECT * FROM resep_new WHERE id = ? LIMIT 1";
    db.query(foodQuery, [foodId], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "Internal server error" });

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "Food not found" });
      }

      // Check if food is already saved
      const checkQuery = "SELECT * FROM fav_foods WHERE user_id = ? AND food_id = ?";
      db.query(checkQuery, [userId, foodId], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Internal server error" });

        if (results.length > 0) {
          return res.status(400).json({ success: false, message: "Food already saved" });
        }

        // Save the food
        const saveQuery = "INSERT INTO fav_foods (user_id, food_id) VALUES (?, ?)";
        db.query(saveQuery, [userId, foodId], (err, results) => {
          if (err) return res.status(500).json({ success: false, message: "Internal server error" });
          res.json({ success: true, message: "Food saved successfully" });
        });
      });
    });
  } catch (error) {
    console.error("Error saving food:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/api/users/artikel", (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ success: false, message: "Unauthorized" });

    const authToken = authorization.split(" ")[1];
    if (!authToken) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decodedToken = jwt.verify(authToken, "rahasia-rahasia");
    const userId = decodedToken.userId;

    const sql = "SELECT * FROM artikel WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error retrieving article from database:", err);
        res.status(500).json({ error: "Error retrieving article from database" });
      } else {
        if (result.length > 0) {
          console.log("Article found:", result);
          res.status(200).json(result);
        } else {
          console.log("Article Not Found");
          res.status(200).json({ message: "Kamu belum membuat artikel" });
        }
      }
    });
  } catch (error) {
    console.error("Error getting articles:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/api/users/artikel/create", uploadArtikel.single("gambar"), (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ success: false, message: "Unauthorized" });

    const authToken = authorization.split(" ")[1];
    if (!authToken) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decodedToken = jwt.verify(authToken, "rahasia-rahasia");
    const userId = decodedToken.userId;

    const { judul, deskripsi } = req.body;
    const gambar = req.file.filename;
    const sql = "INSERT INTO artikel(judul, img, deskripsi, user_id) VALUES(?, ?, ?, ?);";
    db.query(sql, [judul, `uploads/articles/${gambar}`, deskripsi, userId], (err, result) => {
      if (err) {
        console.error("Error retrieving article from database:", err);
        res.status(500).json({ error: "Artikel gagal disimpan" });
      }
      return res.status(200).json({ message: "Artikel berhasil disimpan" });
    });
  } catch (error) {
    console.error("Error uploading articles:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
