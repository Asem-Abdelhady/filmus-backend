import MoviesHandler from './SavedMoviesController';
import LovedMovie from '../../models/LovedMoviesModel';

const lovedMoviesController = new MoviesHandler(LovedMovie);

export default lovedMoviesController;
