require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const weineRoutes = require('./routes/weineRoutes');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL-Verbindung
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Rate Limiting gegen API-Spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Zu viele Anfragen, bitte warte kurz!"
});
app.use(limiter);

// Test-Route für die Datenbankverbindung
app.get('/test-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        res.json({ message: 'Datenbankverbindung erfolgreich!', time: result.rows[0] });
    } catch (err) {
        console.error('Fehler bei der Datenbankverbindung:', err);
        res.status(500).json({ error: 'Datenbankverbindung fehlgeschlagen' });
    }
});

// API-Routen einbinden
app.use('/api', weineRoutes);

// Server starten
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
