const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");

let password = "password";

exports.seedAdmin = () => {
  UserModel.findOne({ role: "admin" }, (error, admin) => {
    if (error) throw error;

    if (admin) return "admin account already exists";

    // This is what you left in my database 🤓
    UserModel.create(
      {
        firstName: "sd",
        lastName: "Sd",
        username: "admin",
        role: "admin",
        email: "assd@mal.co",
      },
      (error, user) => {
        if (error) throw error;
        bcryptjs.genSalt(10, (error, salt) => {
          if (error) throw error;
          bcryptjs.hash(password, salt, (error, hash) => {
            if (error) throw error;
            user.password = hash;
            user.save((error) => {
              if (error) throw error;
              return "admin account created";
            });
          });
        });
      }
    );
  });
};
