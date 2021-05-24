const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "bcrypt0rbcryptJS";
const expiry = 604800;

exports.registerNewUser = (req, res) => {
  UserModel.findOne({ username: req.body.username }, (error, existingUser) => {
    if (error) return res.status(500).json({ message: error });

    if (existingUser)
      return res.status(400).json({ message: "username taken" });

    UserModel.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
      },
      (error, newUser) => {
        if (error) return res.status(500).json({ message: error });

        bcryptjs.genSalt(10, (error, salt) => {
          if (error) return res.status(500).json({ message: error });

          bcryptjs.hash(req.body.password, salt, (error, hashedPassword) => {
            if (error) return res.status(500).json({ message: error });

            newUser.password = hashedPassword;
            newUser.save((error, savedUser) => {
              if (error) return res.status(500).json({ message: error });

              jwt.sign(
                {
                  id: savedUser._id,
                  username: savedUser.username,
                  firstName: savedUser.firstName,
                  lastName: savedUser.lastName,
                },
                secret,
                { expiresIn: expiry },
                (error, token) => {
                  if (error) return res.status(500).json({ message: error });

                  return res
                    .status(200)
                    .json({ message: "user registration successful", token });
                }
              );
            });
          });
        });
      }
    );
  });
};

exports.loginUser = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (error, foundUser) => {
    if (error) return res.status(500).json({ err });

    if (!foundUser) return res.status(401).json({ message: "incorrect email" });

    let match = bcryptjs.compareSync(req.body.password, foundUser.password);

    if (!match) return res.status(401).json({ message: "incorrect password" });

    jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      },
      secret,
      { expiresIn: expiry },
      (error, token) => {
        if (error) return res.status(500).json({ err });
        return res.status(200).json({ message: "user logged in", token });
      }
    );
  });
};
