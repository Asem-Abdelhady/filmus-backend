import { Schema } from 'mongoose';
import type ISavedMovieSchema from '../types/SavedMovieSchema';

const watchedMovieSchema = new Schema<ISavedMovieSchema>(
    {
        _id: { type: Number },
        name: { type: String },
        overview: { type: String },
        poster_path: { type: String },
        vote_average: { type: Number },
        release_date: { type: String },
        vote_count: { type: Number },
    },
    {
        timestamps: true,
    }
);

export default watchedMovieSchema;
