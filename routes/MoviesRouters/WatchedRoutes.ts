import express from 'express';
import watchedMoviesHandler from '../../controllers/MoviesControllers/WatchedMoviesController';
import { protect } from '../../middleware/AuthMiddleware';
const watchedRouter = express.Router();

watchedRouter
    .route('/')
    .get(watchedMoviesHandler.getMoviesHandler)
    .post(protect, watchedMoviesHandler.createMovieHandler);
watchedRouter
    .route('/:id')
    .get(watchedMoviesHandler.getMoviesHandler)
    .put(protect, watchedMoviesHandler.updateMovieHandler)
    .delete(protect, watchedMoviesHandler.deleteMovieHandler);
export default watchedRouter;
