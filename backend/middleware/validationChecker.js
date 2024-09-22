const { validationResult } = require("express-validator");

module.exports = {
  // ------------------- START FEATURES VALIDATION CHECKER -------------------- //
  checkValidation: (req, res, next) => {
    // TODO: Check Validation
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: error.array()[0].msg,
      });
    }
    next();
  },
  // ------------------- END FEATURES VALIDATION CHECKER -------------------- //
};
