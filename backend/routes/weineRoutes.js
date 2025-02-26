const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Route für Wein-Daten
router.get('/weine', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM weine');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Weindaten:', err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
    }
});

module.exports = router;
