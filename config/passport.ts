import passport from 'passport';
import passportJWT, {
  StrategyOptions,
  VerifyCallbackWithRequest,
} from 'passport-jwt';

import Users from '../models/users';
import { Request } from 'express';
import { VerifyCallback } from 'jsonwebtoken';

const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_SECRET,
  };

  passport.use(
    new JWTstrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await Users.findOne({
          where: { userId: jwtPayload.id },
        });
        console.log('here', user?.userId, jwtPayload.user);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
