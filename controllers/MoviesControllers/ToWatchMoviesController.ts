import MoviesHandler from './SavedMoviesController';
import ToWatchMovieModel from '../../models/ToWatchMoviesModel';

const toWatchMoviesController = new MoviesHandler(ToWatchMovieModel);

export default toWatchMoviesController;
