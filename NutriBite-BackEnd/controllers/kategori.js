import express from 'express';
import cors from 'cors';
import { db } from '../Database/db.js'; // Assuming this imports your database connection

const app = express();
app.use(cors());


app.get('/api/resep/kategori', (req, res) => {
    const kategori_name = req.query.kategori_name;
    console.log(`Request received for recipe ID: ${kategori_name}`);
  
    const sql = 'SELECT * FROM resep_new WHERE kategori_name = ?';
    db.query(sql, [kategori_name], (err, result) => {
      if (err) {
        console.error('Error retrieving recipe from database:', err);
        res.status(500).json({ error: 'Error retrieving recipe from database' });
      } else {
        if (result.length > 0) {
          console.log('Recipe found:', result);
          res.json(result);
        } else {
          console.log('Recipe not found3');
          res.status(404).json({ error: 'Recipe not found3' });
        }
      }
    });
  });

export default app