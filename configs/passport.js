const User          = require('../models/user-model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs'); 
const passport      = require('passport');


passport.serializeUser((loggedInUser, callback) => {
  callback(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, callback) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, userDocument);
  });
});


passport.use(new LocalStrategy({ usernameField: 'email' },(email, password, next) => {
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'Incorrect username.' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password.' });
      return;
    }

    next(null, foundUser);
  });
}));


// Google OAuth
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/api/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ 
            googleID: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          })
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((err) => done(err)); 
        })
        .catch((err) => done(err)); 
    }
  )
);
