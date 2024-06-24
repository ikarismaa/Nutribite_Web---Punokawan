import express from 'express';
import { db } from '../Database/db.js';

const router = express.Router();

const apiURL = 'https://nutribite.1ic70gehm50g.us-south.codeengine.appdomain.cloud';

// Get all food from api
router.post('/api/food-recommend', async (req, res) => {
  try {
    const { calories } = req.body;
    if (!calories) return res.status(400).send({ message: 'Bad request' });

    // Send data to API and return the response
    const response = await fetch(`${apiURL}/predict`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ calories })
    });

    if (!response.ok) {
      return res.status(response.status).send({ message: 'Error fetching data from API' });
    }

    const data = await response.json();
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});


// router.post('/api/food-recommend', async (req, res) => {
//   try {
//     const { minCarbo, maxCarbo, minProtein, maxProtein, minFat, maxFat } = req.body;
//     if (!minCarbo || !maxCarbo || !minProtein || !maxProtein || !minFat || !maxFat) {
//       return res.status(400).send({ message: 'Bad request' });
//     }

//     const query = "SELECT * FROM resep_new WHERE carbo BETWEEN ? AND ? OR protein BETWEEN ? AND ? OR total_fat BETWEEN ? AND ?";

//     db.query(query, [minCarbo, maxCarbo, minProtein, maxProtein, minFat, maxFat], (err, rows) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send({ message: 'Internal server error' });
//       }

//       return res.status(200).send({ recipes: rows });
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ message: 'Internal server error' });
//   }
// });

export default router;