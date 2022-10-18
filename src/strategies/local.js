const { response } = require('express');
const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');

passport.serializeUser((user, done) => {
  console.log("Serializing");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  console.log("deserializing user");
  console.log(id);

  try {
    const user = await User.findById(id);
    console.log(id);
    if(!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, null);
  }

})

passport.use(
  new Strategy({
    usernameField: 'email',
  }, async (email, password, done) => {
      console.log(email);
      console.log(password); 
      try {
        if(!email || !password){
          throw new Error("Missing Credentials");
        }
        const userDB = await User.findOne({ email });
        if (!userDB) throw new Error('User not found');
        const isValid = comparePassword(password, userDB.password);
        if(isValid) {
          console.log("Authentication succesful");
          done(null, userDB);
        } else {
          console.log('Failed to Authenticate');
          done(null, null);
        }
      } catch(err) {
        done(err, null);
      } 
  })
)