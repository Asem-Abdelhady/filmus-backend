import { model } from 'mongoose';
import lovedMovieSchema from '../schemas/LovedMoviesSchema';
import type ISavedMovieSchema from '../types/SavedMovieSchema';

const LovedMovie = model<ISavedMovieSchema>('LovedMovie', lovedMovieSchema);

export default LovedMovie;
