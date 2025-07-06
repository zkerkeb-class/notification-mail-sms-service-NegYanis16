require('dotenv').config();

function checkApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.NOTIF_API_KEY) {
    return res.status(401).json({ error: 'Clé API invalide ou manquante.' });
  }
  next();
}

module.exports = { checkApiKey }; 