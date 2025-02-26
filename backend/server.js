require('dotenv-safe').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const weineRoutes = require('./routes/weineRoutes');
const db = require('./utils/db'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Zu viele Anfragen, bitte warte kurz!"
});
app.use(limiter);

// API-Routen
app.use('/api', weineRoutes);

// Test-Route für die Datenbank
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ message: 'Datenbankverbindung erfolgreich!', time: result.rows[0] });
  } catch (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
    res.status(500).json({ error: 'Datenbankverbindung fehlgeschlagen' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
