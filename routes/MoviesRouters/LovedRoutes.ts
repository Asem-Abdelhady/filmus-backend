import express from 'express';

import lovedMoviesController from '../../controllers/MoviesControllers/LovedMoviesController';
import { protect } from '../../middleware/AuthMiddleware';
const lovedRouter = express.Router();

lovedRouter
    .route('/')
    .get(lovedMoviesController.getMoviesHandler)
    .post(protect, lovedMoviesController.createMovieHandler);
lovedRouter
    .route('/:id')
    .get(lovedMoviesController.getMovieHandler)
    .put(protect, lovedMoviesController.updateMovieHandler)
    .delete(protect, lovedMoviesController.deleteMovieHandler);
export default lovedRouter;
