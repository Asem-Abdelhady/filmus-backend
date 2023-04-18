import MoviesHandler from './SavedMoviesController';
import WatchedMovieModel from '../../models/WatchedMoviesModel';

const watchedMoviesHandler = new MoviesHandler(WatchedMovieModel);

export default watchedMoviesHandler;
