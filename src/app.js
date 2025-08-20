require('dotenv').config();
const express = require('express');
const mailRoutes = require('./routes/mail');

const app = express();

app.use(express.json());
app.use('/api', mailRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée.' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Erreur interne du serveur.' });
});

module.exports = app; 