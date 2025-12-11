const { validationResult } = require('express-validator');
const ValidationError = require('../errors/ValidationError');

function validate(rules) {
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) return next();

      return next(
        new ValidationError("Dados inválidos", errors.mapped())
      );
    },
  ];
}

module.exports = { validate };
