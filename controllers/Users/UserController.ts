import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { type Model } from 'mongoose';
import User from '../../models/UserModel';
import { type IUserSchema } from '../../schemas/UserSchema';
import {
    createUser,
    deleteUser,
    getUserByID,
    getUsers,
    loginUser,
    updateUser,
    getLovedMovies,
    getToWatchMovies,
    getWatchedMovies,
    getLovedMovie,
    getToWatchMovie,
    getWatchedMovie,
    createLovedMovie,
    createToWatchMovie,
    createWatchedMovie,
    updateLovedMovie,
    updateWatchedMovie,
    updateToWatchMovie,
    deelteLovedMovie,
    deleteToWatchMovie,
    deleteWatchedMovie,
} from '../../services/UserService';

class UsersHandler {
    constructor(public model: Model<IUserSchema> = User) {}

    getUsersHandler = asyncHandler(async (req: Request, res: Response) => {
        const users = await getUsers(this.model);
        res.status(200).json(users);
    });

    getUserHandler = asyncHandler(async (req: Request, res: Response) => {
        const user = await getUserByID(req.params.id, this.model);
        res.status(201).json(user);
    });

    createUserHandler = asyncHandler(async (req: Request, res: Response) => {
        const createdUser = await createUser(req.body, this.model);
        res.status(201).json(createdUser);
    });

    deleteUserHandler = asyncHandler(async (req: Request, res: Response) => {
        await deleteUser(+req.params.id, this.model);
        res.status(200).json({ message: `User ${req.params.id} deleted` });
    });

    updateUserHandler = asyncHandler(async (req: Request, res: Response) => {
        const user = await updateUser(req.params.id, req.body, this.model);

        res.json(user);
    });

    loginUserHandler = asyncHandler(async (req: Request, res: Response) => {
        const user = await loginUser(
            req.body.email,
            req.body.password,
            this.model
        );
        res.status(201).json(user);
    });

    getLovedMoviesHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const lovedMovies = await getLovedMovies(req.params.id, this.model);
            res.status(200).json(lovedMovies);
        }
    );

    getWatchedMoviesHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const watchedMovies = await getWatchedMovies(
                req.params.id,
                this.model
            );
            res.status(200).json(watchedMovies);
        }
    );

    getToWatchMoviesHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const toWatchMovies = await getToWatchMovies(
                req.params.id,
                this.model
            );
            res.status(200).json(toWatchMovies);
        }
    );

    getLovedMovieHandler = asyncHandler(async (req: Request, res: Response) => {
        const lovedMovie = await getLovedMovie(
            req.params.id,
            req.params.id,
            this.model
        );
        res.status(201).json(lovedMovie);
    });

    getWatchedMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const watchedMovie = await getWatchedMovie(
                req.params.id,
                req.params.id,
                this.model
            );
            res.status(201).json(watchedMovie);
        }
    );

    getToWatchMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const toWatchMovie = await getToWatchMovie(
                req.params.id,
                req.params.id,
                this.model
            );
            res.status(201).json(toWatchMovie);
        }
    );

    // //------------------

    createLovedMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const lovedMovie = await createLovedMovie(
                req.params.id,
                req.body,
                this.model
            );
            res.status(201).json(lovedMovie);
        }
    );

    createWatchedMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const watchedMovie = await createWatchedMovie(
                req.params.id,
                req.body,
                this.model
            );
            res.status(201).json(watchedMovie);
        }
    );

    createToWatchMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const toWatchMovie = await createToWatchMovie(
                req.params.id,
                req.body,
                this.model
            );
            res.status(201).json(toWatchMovie);
        }
    );

    updateLovedMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const lovedMovie = await updateLovedMovie(
                req.params.id,
                req.body,
                this.model
            );
            res.status(201).json(lovedMovie);
        }
    );

    updateWatchedMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const watchedMovie = await updateWatchedMovie(
                req.params.id,
                req.body,
                this.model
            );
            res.status(201).json(watchedMovie);
        }
    );

    updateToWatchMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const toWatchMovie = await updateToWatchMovie(
                req.params.id,
                req.body,
                this.model
            );
            res.status(201).json(toWatchMovie);
        }
    );

    // -----------------
    deleteLovedMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            await deelteLovedMovie(req.params.id, req.params.id, this.model);
            res.status(200).json({ message: `Movie ${req.params.id} deleted` });
        }
    );

    deleteWatchedMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            await deleteWatchedMovie(req.params.id, req.params.id, this.model);
            res.status(200).json({ message: `Movie ${req.params.id} deleted` });
        }
    );

    deleteToWatchMovieHandler = asyncHandler(
        async (req: Request, res: Response) => {
            await deleteToWatchMovie(req.params.id, req.params.id, this.model);
            res.status(200).json({ message: `Movie ${req.params.id} deleted` });
        }
    );
}

export default UsersHandler;
