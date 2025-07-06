const { body, validationResult } = require('express-validator');

const validateWelcomeMail = [
  body('email').isEmail().withMessage('Adresse email invalide.'),
  body('firstName').isString().notEmpty().withMessage('Prénom requis.'),
  body('lastName').isString().notEmpty().withMessage('Nom de famille requis.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateWelcomeMail }; 