import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import loginRoutes from "./controllers/login.js";
import registerRoutes from "./controllers/register.js";
import recipeRoutes from "./controllers/recipes.js";
import deskripsiRecipeRoutes from "./controllers/deskripsiresep.js";
import kategoriRoutes from "./controllers/kategori.js";
import ArtikelIndex from "./controllers/artikelindex.js";
import deskripsiArtikelRoutes from "./controllers/deskripsiartikel.js";
import akgRoutes from "./controllers/akg.js";
import userRoutes from "./controllers/user.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use(loginRoutes);
app.use(registerRoutes);
app.use(recipeRoutes);
app.use(deskripsiRecipeRoutes);
app.use(kategoriRoutes);
app.use(ArtikelIndex);
app.use(deskripsiArtikelRoutes);
app.use(akgRoutes);
app.use(userRoutes);

// Middleware untuk menghidangkan file statis dari folder uploads
app.use("/uploads", express.static("uploads"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
