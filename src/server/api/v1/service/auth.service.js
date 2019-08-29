/*
Import external libraries
*/
import passport from 'passport';
import * as passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

/*
Import internal libraries
*/
import { User } from '../database';
import config from '../../../config';

/*
Constants
*/
const LocalStrategy = passportLocal.Strategy;
const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;

class AuthService {
    constructor() {
        this.initializeJwtStrategy();
        this.initializeLocalStrategy();
        this.passport = passport;
    }


    /*
    JSON WEB TOKEN STRATEGY
    */
    initializeJwtStrategy = () => {
        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: config.auth.jwtSecret
        }, async (payload, done) => {
            try {
                // Find the user specified in token
                const user = await User.findById(payload.sub);

                // If user does not exist, handle it
                if (!user) {
                    console.log("user does not exist")
                    return done(null, false);
                }

                // Otherwise, return the user
                done(null, user)
            } catch (error) {
                done(error, false)
            }
        }))
    }


    /* 
    LOCAL STRATEGY
    */
    initializeLocalStrategy = () => {
        passport.use(new LocalStrategy({
            usernameField: 'email'
        }, async (email, password, done) => {
            try {
                // Find the user given the email
                const user = await User.findOne({ "local.email": email });

                // If not, handle it
                if (!user) {
                    return done(null, false);
                }

                // Check if the password is correct
                const isMatch = await user.isValidPassword(password);

                // If not, handle it
                if (!isMatch) {
                    return done(null, false);
                }

                // Otherwise, return the user
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }));
    }
}

export default AuthService;
