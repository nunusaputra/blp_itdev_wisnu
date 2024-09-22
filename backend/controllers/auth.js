const User = require("../models").User;
const jwt = require("jsonwebtoken");
const argon = require("argon2");
const path = require("path");
const fs = require("fs");

module.exports = {
  // ------------------- START FEATURES REGISTER -------------------- //
  register: async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    //   TODO: Get user by email
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //   TODO: Check if user is already exist
    if (user) {
      return res.status(400).json({
        message: "Email already exists!",
      });
    }

    // TODO: Check if password and confirm password not match
    if (password !== confPassword) {
      return res.status(400).json({
        message: "Password and confirm password not match!",
      });
    }

    // TODO: Hashing Password with argon2
    const hashPassword = await argon.hash(password);

    if (!req.files) {
      return res.status(400).json({
        message: "File not uploaded!",
      });
    }

    let imageURL = null;
    let imageName = null;
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    // TODO: Validation if image exists
    if (req.files.profile_pict) {
      const image = req.files.profile_pict;
      const imageSize = image.data.length;
      const imageExt = path.extname(image.name).toLowerCase();
      imageName = image.md5 + imageExt;
      imageURL = `${req.protocol}://${req.get("host")}/images/${imageName}`;

      // TODO: Validation if image type is not allowed
      if (!allowedTypes.includes(imageExt)) {
        return res.status(422).json({
          message: "Invalid image type! Only PNG, JPG, JPEG are allowed.",
        });
      }

      // TODO: Validation if image size is too large
      if (imageSize > 2000000) {
        return res.status(422).json({
          message: "File size too large! Max size 2 MB.",
        });
      }

      // TODO: Save image to folder images
      image.mv(`./public/images/${imageName}`, (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      });
    }

    try {
      // TODO: Submit new users to database
      await User.create({
        name,
        email,
        password: hashPassword,
        profile_pict: imageName,
        profileURL: req.files.profile_pict ? imageURL : null,
      });

      // * Response if success submit new users to database
      res.status(201).json({
        message: "Register Successufully!",
      });
    } catch (error) {
      // * Response if failed submit new users to database
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ------------------- END FEATURES REGISTER -------------------- //

  //   ------------------- START FEATURES LOGIN -------------------- //
  login: async (req, res) => {
    try {
      //   TODO: Get user by email
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      // TODO: Check if user not found
      if (!user) {
        return res.status(404).json({
          message: "Users not found!",
        });
      }

      // TODO: Check password with argon
      const checkPassword = await argon.verify(
        user.password,
        req.body.password
      );
      if (!checkPassword) {
        return res.status(400).json({
          message: "Wrong password!",
        });
      }

      // TODO: Create token
      const id = user.id;
      const name = user.name;
      const email = user.email;
      const profile = user.profile_pict;

      const accessToken = jwt.sign(
        { id, name, email, profile },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      const refreshToken = jwt.sign(
        { id, name, email, profile },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      //   TODO: Save refresh token to database
      await User.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      // TODO: Set cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // * Response if success login
      res.status(200).json({
        message: "Login Successufully!",
        data: accessToken,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //   ------------------- END FEATURES LOGIN -------------------- //

  //   ------------------- START FEATURES LOGOUT -------------------- //
  logout: async (req, res) => {
    // TODO: Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    // TODO: Check if refresh token not found
    if (!refreshToken) {
      return res.sendStatus(204);
    }

    // TODO: Get user by refresh token
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    // TODO: Check if refresh token is null
    if (user === null) {
      return res.sendStatus(204);
    }

    // TODO: Delete refresh token from database
    try {
      await User.update(
        {
          refresh_token: null,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      // TODO: Clear cookie
      res.clearCookie("refreshToken");

      // * Response if success logout
      res.status(200).json({
        message: "Logout Successufully!",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //   ------------------- END FEATURES LOGOUT -------------------- //

  //   ------------------- START FEATURES REFRESH TOKEN -------------------- //
  refreshToken: async (req, res) => {
    try {
      // TODO: Get refresh token from cookie
      const refreshToken = req.cookies.refreshToken;

      // TODO: Check if refresh token not found
      if (!refreshToken) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      // TODO: Verify refresh token
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return res.status(403).json({
              message: "Forbidden",
            });
          }

          try {
            // TODO: Get user by id
            const user = await User.findOne({
              where: {
                id: decoded.id,
              },
            });

            // TODO: Check if user not found
            if (!user) {
              return res.status(404).json({
                message: "User not found!",
              });
            }

            // TODO: Create new access token
            const id = user.id;
            const name = user.name;
            const email = user.email;
            const profile = user.profile_pict;

            const accessToken = jwt.sign(
              { id, name, email, profile },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "20m",
              }
            );

            // * Response if success refresh token
            res.status(200).json({
              message: "Refresh Token Successufully!",
              data: accessToken,
            });
          } catch (error) {
            res.status(500).json({
              message: error.message,
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //   ------------------- END FEATURES REFRESH TOKEN -------------------- //

  //   ------------------- START FEATURES GET ME -------------------- //
  me: async (req, res) => {
    try {
      // TODO: Get user by id
      const user = await User.findOne({
        where: {
          id: req.userId,
        },
        attributes: {
          exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
        },
      });

      // TODO: Check if user not found
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      // * Response if success get me
      res.status(200).json({
        message: "Successufully get me!",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //   ------------------- END FEATURES GET ME -------------------- //
};
