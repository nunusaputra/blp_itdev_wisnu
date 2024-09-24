const User = require("../models").User;
const jwt = require("jsonwebtoken");

module.exports = {
  // ------------------- START FEATURES VALIDATION TOKEN -------------------- //
  checkToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      req.email = decoded.email;

      try {
        const user = await User.findOne({
          where: {
            email: req.email,
          },
        });

        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        req.userId = user.id;
        next();
      } catch (error) {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    });
  },
  // ------------------- END FEATURES VALIDATION TOKEN -------------------- //
};
