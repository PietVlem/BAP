/*
Import the external libraries:
- express
*/
import express from 'express';

/*
Import the internal libraries:
*/
import AuthService from '../service';
import authRouter from './auth.routes';
import newsRouter from './news.routes';
import categoryRouter from './category.routes';
import newspostRouter from './newspost.routes';
import userRouter from './user.routes';
import meetingRouter from './meeting.routes';
import buildingRouter from './building.routes';
import floorRouter from './floor.routes';
import helpCentreItemRouter from './helpcentreitem.routes';

// Initialize the AuthService
const authService = new AuthService();

// Define and initiate an express router
const apiV1Router = express.Router();
authRouter(apiV1Router, authService);
newsRouter(apiV1Router, authService);
categoryRouter(apiV1Router, authService);
newspostRouter(apiV1Router, authService);
userRouter(apiV1Router, authService);
meetingRouter(apiV1Router, authService);
buildingRouter(apiV1Router, authService);
floorRouter(apiV1Router, authService);
helpCentreItemRouter(apiV1Router, authRouter);

export default apiV1Router;
