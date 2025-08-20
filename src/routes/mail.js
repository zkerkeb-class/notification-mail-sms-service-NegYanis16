const express = require('express');
const { validateMail } = require('../middleware/validateMail');
const { validateWelcomeMail } = require('../middleware/validateWelcomeMail');
const { checkApiKey } = require('../middleware/checkApiKey');
const mailService = require('../services/mailService');

const router = express.Router();

router.post('/send-mail', checkApiKey, validateMail, async (req, res) => {
  const { to, subject, content } = req.body;
  try {
    await mailService.sendMail({ to, subject, content });
    return res.status(200).json({ message: 'Email envoyé avec succès.' });
  } catch (error) {
    if (error.code === 'EENVELOPE' || error.responseCode === 550) {
      return res.status(400).json({ error: 'Adresse email invalide.' });
    }
    return res.status(502).json({ error: 'Erreur lors de l\'envoi de l\'email.', details: error.message, smtp: error });
  }
});

router.post('/send-welcome-email', checkApiKey, validateWelcomeMail, async (req, res) => {
  const { email, firstName, lastName } = req.body;
  try {
    await mailService.sendWelcomeEmail({ email, firstName, lastName });
    return res.status(200).json({ message: 'Email de bienvenue envoyé avec succès.' });
  } catch (error) {
    if (error.code === 'EENVELOPE' || error.responseCode === 550) {
      return res.status(400).json({ error: 'Adresse email invalide.' });
    }
    return res.status(502).json({ error: 'Erreur lors de l\'envoi de l\'email de bienvenue.', details: error.message });
  }
});

router.post('/send-purchase-confirmation', checkApiKey, async (req, res) => {
  const { email, firstName, lastName, quantity, amount, transactionId } = req.body;
  
  // Validation des champs requis
  if (!email || !firstName || !lastName || !quantity || !amount || !transactionId) {
    return res.status(400).json({ 
      error: 'Tous les champs sont requis: email, firstName, lastName, quantity, amount, transactionId' 
    });
  }
  
  try {
    await mailService.sendPurchaseConfirmationEmail({ 
      email, 
      firstName, 
      lastName, 
      quantity, 
      amount, 
      transactionId 
    });
    return res.status(200).json({ message: 'Email de confirmation d\'achat envoyé avec succès.' });
  } catch (error) {
    if (error.code === 'EENVELOPE' || error.responseCode === 550) {
      return res.status(400).json({ error: 'Adresse email invalide.' });
    }
    return res.status(502).json({ 
      error: 'Erreur lors de l\'envoi de l\'email de confirmation d\'achat.', 
      details: error.message 
    });
  }
});

module.exports = router; 