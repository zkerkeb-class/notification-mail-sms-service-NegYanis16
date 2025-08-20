const { body, validationResult } = require('express-validator');

const validateMail = [
  body('to').isEmail().withMessage('Destinataire invalide.'),
  body('subject').isString().notEmpty().withMessage('Sujet requis.'),
  body('content').isString().notEmpty().withMessage('Contenu requis.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateMail }; 