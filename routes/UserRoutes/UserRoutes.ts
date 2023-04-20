import express from 'express';
import UsersHandler from '../../controllers/Users/UserController';
import { protect } from '../../middleware/AuthMiddleware';
const userRouter = express.Router();

const userHandler = new UsersHandler();
userRouter
    .route('/')
    .get(protect, userHandler.getUsersHandler)
    .post(userHandler.createUserHandler);

userRouter.route('/login').post(userHandler.loginUserHandler);

userRouter
    .route('/:id')
    .get(userHandler.getUserHandler)
    .put(protect, userHandler.updateUserHandler)
    .delete(protect, userHandler.deleteUserHandler);

userRouter
    .route('/:userId/loved')
    .get(protect, userHandler.getLovedMoviesHandler)
    .post(protect, userHandler.createLovedMovieHandler);
userRouter
    .route('/:userId/loved/:id')
    .get(protect, userHandler.getLovedMovieHandler)
    .put(protect, userHandler.updateLovedMovieHandler)
    .delete(protect, userHandler.deleteLovedMovieHandler);

userRouter
    .route('/:userId/watched')
    .get(protect, userHandler.getWatchedMoviesHandler)
    .post(protect, userHandler.createWatchedMovieHandler);
userRouter
    .route('/:userId/watched/:id')
    .get(protect, userHandler.getWatchedMovieHandler)
    .put(protect, userHandler.updateWatchedMovieHandler)
    .delete(protect, userHandler.deleteWatchedMovieHandler);

userRouter
    .route('/:userId/to-watch')
    .get(protect, userHandler.getToWatchMoviesHandler)
    .post(protect, userHandler.createToWatchMovieHandler);
userRouter
    .route('/:userId/to-watch/:id')
    .get(protect, userHandler.getToWatchMovieHandler)
    .put(protect, userHandler.updateToWatchMovieHandler)
    .delete(protect, userHandler.deleteToWatchMovieHandler);

export default userRouter;
