import express from 'express';
import { db } from '../Database/db.js';

const router = express.Router();

router.post('/api/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const query = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';

    db.query(query, [name, username, email, password], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      res.json({ success: true, message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
