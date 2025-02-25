require('dotenv-safe').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const weineRoutes = require('./routes/weineRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(session({ secret: 'oino-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Rate Limiting gegen API-Spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Zu viele Anfragen, bitte warte kurz!"
});
app.use(limiter);

// API-Routen einbinden
app.use('/api', weineRoutes);

// Server starten
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));

