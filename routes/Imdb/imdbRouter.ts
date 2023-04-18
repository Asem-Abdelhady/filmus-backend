import express from 'express';
import ImdbHandler from '../../controllers/Imdb/ImdbController';
const imdbRouter = express.Router();

const imdbHandler: ImdbHandler = new ImdbHandler();
imdbRouter.route('/trending/:page').get(imdbHandler.getTrendingHandler);
imdbRouter.route('/movies/:page').get(imdbHandler.getMoviesHandler);
export default imdbRouter;
