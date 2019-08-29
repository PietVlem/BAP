/*
Import external libraries
*/
import passport from 'passport';

/*
Import the internal libraries
*/
import { AuthController } from '../controller';
import { validateBody, schemas } from '../helpers/routeHelpers';

/* 
Passport authentication option(s)
*/
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// Create instance of AuthController otherwise you can't use it
const authController = new AuthController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.post('/signUp', validateBody(schemas.registerSchema), authController.signUp);
    /**
     * @swagger
     * /api/v1/signUp:
     *      post:
     *          tags:
     *              - Auth
     *          summary: Create a user to the application
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          parameters:
     *              - in: email
     *                name: email
     *                description: your email
     *                required: true
     *              - in: password
     *                name: password 
     *                description: your password 
     *                required: true
     *              - in: name
     *                name: name 
     *                description: your full name
     *                required: true
     *              - in: dayOfBirth
     *                name: dayOfBirth 
     *                description: your birthday 
     *                required: true
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.post('/signIn', validateBody(schemas.authSchema), passportSignIn, authController.signIn);
        /**
     * @swagger
     * /api/v1/signIn:
     *      post:
     *          tags:
     *              - Auth
     *          summary: Sign in a user to the application (local)
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          parameters:
     *              - in: email
     *                name: email
     *                description: your email
     *                required: true
     *              - in: password
     *                name: password 
     *                description: your password 
     *                required: true
     *          responses:
     *              200:
     *                  description: Web token
     */
};

export default initializeEndpoints;
