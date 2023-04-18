import express from 'express';
import ImdbHandler from '../../controllers/Imdb/ImdbController';
const imdbRouter = express.Router();

const imdbHandler: ImdbHandler = new ImdbHandler();
imdbRouter.route('/trending/:page').get(imdbHandler.getTrendingHandler);
imdbRouter.route('/movies/:page').get(imdbHandler.getMoviesHandler);
imdbRouter.route('/movie/:movie_id').get(imdbHandler.getMovieDetailHandler);
imdbRouter.route('/videos/:movie_id').get(imdbHandler.getMovieVideoslHandler);
imdbRouter.route('/credits/:movie_id').get(imdbHandler.getMovieCreditsHandler);
export default imdbRouter;
