import type ISavedMovie from './MoviesTypes';

interface ISavedMovieSchema extends ISavedMovie {
    _id: number;
}

export default ISavedMovieSchema;
