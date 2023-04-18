import { model } from 'mongoose';
import toWatchMovieSchema from '../schemas/ToWatchMoveiesSchema';
import type ISavedMovieSchema from '../types/SavedMovieSchema';

const ToWatchMovieModel = model<ISavedMovieSchema>(
    'ToWatchMovie',
    toWatchMovieSchema
);

export default ToWatchMovieModel;
