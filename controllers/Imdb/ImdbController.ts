import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import {
    getImdbMovies,
    getTrending,
    getMovieDetail,
    getMovieVideos,
    getMovieCredits,
} from '../../services/ImdbService';
class ImdbHandler {
    getTrendingHandler = asyncHandler(async (req: Request, res: Response) => {
        const trending = await getTrending(req.params.page);
        res.status(200).json(trending);
    });

    getMoviesHandler = asyncHandler(async (req: Request, res: Response) => {
        const movies = await getImdbMovies(req.params.page);
        res.status(200).json(movies);
    });

    getMovieDetailHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const movieDetail = await getMovieDetail(req.params.movie_id);
            res.status(200).json(movieDetail);
        }
    );

    getMovieVideoslHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const movieVideos = await getMovieVideos(req.params.movie_id);
            res.status(200).json(movieVideos);
        }
    );

    getMovieCreditsHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const movieCredits = await getMovieCredits(req.params.movie_id);
            res.status(200).json(movieCredits);
        }
    );
}

export default ImdbHandler;
