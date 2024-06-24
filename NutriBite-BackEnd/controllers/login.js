import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../Database/db.js';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'Email or password incorrect' });
      }

      const user = results[0];

      if (user.password !== password) {
        return res.status(401).json({ success: false, message: 'Email or password incorrect' });
      }

      const authToken = jwt.sign({userId: user.id}, 'rahasia-rahasia', { expiresIn: '14d' });

      res.json({ success: true, message: 'Login successful', token: authToken, username: user.username });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
