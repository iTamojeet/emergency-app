import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

const User = mongoose.model('User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    })
  );
};
