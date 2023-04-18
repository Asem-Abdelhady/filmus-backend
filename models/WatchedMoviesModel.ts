import { model } from 'mongoose';
import watchedMovieSchema from '../schemas/WatchedMoviesSchema';
import type ISavedMovieSchema from '../types/SavedMovieSchema';

const WatchedMovieModel = model<ISavedMovieSchema>(
    'Watched',
    watchedMovieSchema
);

export default WatchedMovieModel;
