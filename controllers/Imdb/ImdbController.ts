import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { getImdbMovies, getTrending } from '../../services/ImdbService';

class ImdbHandler {
    getTrendingHandler = asyncHandler(async (req: Request, res: Response) => {
        const trending = await getTrending(req.params.page);
        res.status(200).json(trending);
    });

    getMoviesHandler = asyncHandler(async (req: Request, res: Response) => {
        const movies = await getImdbMovies(req.params.page);
        res.status(200).json(movies);
    });
}

export default ImdbHandler;
