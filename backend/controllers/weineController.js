const pgPool = require('../utils/db');

async function getWeine(req, res) {
    try {
        const result = await pgPool.query("SELECT * FROM weine");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Fehler beim Abrufen der Weine" });
    }
}

module.exports = { getWeine };
