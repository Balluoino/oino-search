const db = require('../utils/db');

exports.getWeine = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM weine'); // Ersetze mit deiner Tabelle
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Weine:', err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Weine' });
    }
};
