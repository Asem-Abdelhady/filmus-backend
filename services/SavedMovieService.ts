import { type Model } from 'mongoose';
import { sanitizeSavedMovie } from '../sanitizers/SavedMovieSanitizer';
import type ISavedMovieSchema from '../types/SavedMovieSchema';

export async function getMovies(
    model: Model<ISavedMovieSchema>
): Promise<ISavedMovieSchema[]> {
    try {
        const movies = await model.find();
        return movies;
    } catch (e) {
        throw new Error('No Movies Yet!!');
    }
}

export async function getMovieByID(
    id: number,
    model: Model<ISavedMovieSchema>
): Promise<ISavedMovieSchema> {
    try {
        const movie = await model.findById(id);
        if (movie == null) throw new Error('Movie not found');
        return movie;
    } catch (err) {
        throw new Error();
    }
}

export async function createMovie(
    movie: ISavedMovieSchema,
    model: Model<ISavedMovieSchema>
): Promise<ISavedMovieSchema> {
    const sanitizedMovie = sanitizeSavedMovie(movie);

    try {
        const movie = await model.create(sanitizedMovie);

        return movie;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateMovie(
    id: number,
    movie: ISavedMovieSchema,
    model: Model<ISavedMovieSchema>
): Promise<ISavedMovieSchema> {
    const sanitizedMovie = sanitizeSavedMovie(movie);

    try {
        const updatedMovie = await model.findByIdAndUpdate(id, sanitizedMovie, {
            new: true,
        });
        if (updatedMovie == null) throw new Error('Movie not found');
        return updatedMovie;
    } catch (e) {
        throw new Error('Error updating the movie');
    }
}

export async function deleteMovie(
    id: number,
    model: Model<ISavedMovieSchema>
): Promise<void> {
    try {
        const movie = await model.findByIdAndDelete(id);
        if (movie == null) throw new Error('Movie not found');
        return;
    } catch (err) {
        throw new Error('Error deleting the movie');
    }
}
