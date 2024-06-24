import express from 'express';
import cors from 'cors';
import { db } from '../Database/db.js';

const app = express();
app.use(cors());

// Menggunakan Router dari Express
const router = express.Router();

// Endpoint untuk mengambil deskripsi resep berdasarkan ID
router.get('/api/artikel/:id', (req, res) => {
  const artikelId = req.params.id; // Menggunakan req.params.id
  console.log(`Request received for recipe ID: ${artikelId}`); // Logging

  // Menggunakan parameterized query untuk mencegah SQL Injection
  const sql = 'SELECT * FROM artikel WHERE id = ?';

  // Melakukan query ke database dengan parameter id yang aman
    db.query(sql, [artikelId], (err, result) => {
        if (err) {
        console.error('Error retrieving recipe description from database:', err);
        res.status(500).json({ error: 'Error retrieving recipe description from database' });
        } else {
        if (result.length > 0) {
            console.log('Recipe found:', result[0]); // Logging
            res.json(result[0]); // Mengirimkan data deskripsi resep dalam format JSON
        } else {
            console.log('recipe not found'); // Logging
            res.status(404).json({ error: 'Recipe not found' });
        }
        }
    });
});

// Menggunakan router untuk semua endpoint API
app.use('/api', router);

// Export express app agar bisa digunakan di file lain
export default app;
