import passport from 'passport';
import passportJWT from 'passport-jwt';

import Users from '../models/users';

const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await Users.findOne({ where: { userId: jwtPayload.id } });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
