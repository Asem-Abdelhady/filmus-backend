import express from 'express';
import * as Colors from 'colors.ts';
import cors from 'cors';
import { connectDB } from './database/db';
import { errorHandler } from './middleware/ErrorMiddleware';

import lovedRouter from './routes/MoviesRouters/LovedRoutes';
import toWatchRouter from './routes/MoviesRouters/ToWatchRoutes';
import watchedRouter from './routes/MoviesRouters/WatchedRoutes';
import userRouter from './routes/UserRoutes/UserRoutes';
import imdbRouter from './routes/Imdb/imdbRouter';

import { PORT } from './utils/config';

Colors.colors('', '');

export const db = async (): Promise<void> => {
    await connectDB();
};

void db();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/loved', lovedRouter);
app.use('/to-watch', toWatchRouter);
app.use('/watched', watchedRouter);

app.use('/imdb', imdbRouter);

app.use('/users', userRouter);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`);
});
