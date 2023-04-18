import express from 'express';
import toWatchMoviesController from '../../controllers/MoviesControllers/ToWatchMoviesController';
import { protect } from '../../middleware/AuthMiddleware';
const toWatchRouter = express.Router();

toWatchRouter
    .route('/')
    .get(toWatchMoviesController.getMoviesHandler)
    .post(protect, toWatchMoviesController.createMovieHandler);
toWatchRouter
    .route('/:id')
    .get(toWatchMoviesController.getMoviesHandler)
    .put(protect, toWatchMoviesController.updateMovieHandler)
    .delete(protect, toWatchMoviesController.deleteMovieHandler);
export default toWatchRouter;
