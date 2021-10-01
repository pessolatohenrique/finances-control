const passport = require("passport");
const User = require("../models").User;
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      done("This user doesnt exists", null);
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      done("Invalid username or password", null);
    }

    return done(null, user);
  })
);

passport.use(
  new BearerStrategy(async function (token, done) {
    try {
      const jwtObject = await jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findOne({
        where: { id: jwtObject.id },
      });

      return done(null, user);
    } catch (error) {
      console.log("ERROR", error);
      done(error, null);
    }
  })
);
