import { Schema } from 'mongoose';
import type ISavedMovieSchema from '../types/SavedMovieSchema';

const lovedMovieSchema = new Schema<ISavedMovieSchema>(
    {
        _id: { type: Number, required: true },
        title: { type: String, required: true },
        overview: { type: String, required: true },
        poster_path: { type: String, required: true },
        vote_average: { type: Number },
        release_date: { type: String },
        vote_count: { type: Number },
    },
    {
        timestamps: true,
    }
);

export default lovedMovieSchema;
