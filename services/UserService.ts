import { type Model } from 'mongoose';
import HttpException, { ErrorHandler } from '../middleware/ErrorMiddleware';
import { sanitizeLoginUser, sanitizeUser } from '../sanitizers/UserSanitizer';
import { type IUserSchema } from '../schemas/UserSchema';
import { type IUserReturnType } from '../types/UserTypes';
import type IUser from '../types/UserTypes';
import bcrypt from 'bcrypt';
import { generateToken } from './TokenService';
import type ISavedMovieSchema from '../types/SavedMovieSchema';
import { sanitizeSavedMovie } from '../sanitizers/SavedMovieSanitizer';

export async function getUsers(model: Model<IUserSchema>): Promise<IUser[]> {
    try {
        const users = await model.find();
        return users;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getUserByID(
    userId: string,
    model: Model<IUserSchema>
): Promise<IUserSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('User not found');
        return user;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function createUser(
    user: IUser,
    model: Model<IUserSchema>
): Promise<IUserReturnType> {
    const sanitizedUser = await sanitizeUser(user);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizedUser.password, salt);

    try {
        const newUser = await model.create({
            username: sanitizedUser.username,
            email: sanitizedUser.email,
            password: hashedPassword,
            isAdmin: sanitizedUser.isAdmin,
            lovedMovies: new Map([]),
            watchedMovies: new Map([]),
            toWatchMovies: new Map([]),
        });

        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            access_token: generateToken({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            }),
        };
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function updateUser(
    userId: string,
    user: IUser,
    model: Model<IUserSchema>
): Promise<IUserSchema> {
    const sanitizedUser = await sanitizeUser(user);

    try {
        const updatedUser = await model.findByIdAndUpdate(
            userId,
            sanitizedUser,
            {
                new: true,
            }
        );
        if (updatedUser == null) throw new Error('User not found');
        return updatedUser;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function deleteUser(
    userId: number,
    model: Model<IUserSchema>
): Promise<void> {
    try {
        const user = await model.findByIdAndDelete(userId);
        if (user == null) throw new Error('User not found');
        return;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getLovedMovies(
    id: string,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema[]> {
    try {
        const user = await model.findById(id);
        if (user == null) throw new Error('No such a user');
        const movies = user.lovedMovies;
        return Array.from(movies.values());
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getWatchedMovies(
    id: string,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema[]> {
    try {
        const user = await model.findById(id);
        if (user == null) throw new Error('No such a user');
        const movies = user.watchedMovies;
        return Array.from(movies.values());
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getToWatchMovies(
    id: string,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema[]> {
    try {
        const user = await model.findById(id);
        if (user == null) throw new Error('No such a user');
        const movies = user.toWatchMovies;
        return Array.from(movies.values());
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getLovedMovie(
    userId: string,
    id: string,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const movie = user.lovedMovies.get(id);
        if (movie == null) throw new Error('No such a movie');
        return movie;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getWatchedMovie(
    userId: string,
    id: string,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const movie = user.watchedMovies.get(id);
        if (movie == null) throw new Error('No such a movie');
        return movie;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getToWatchMovie(
    userId: string,
    id: string,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const movie = user.toWatchMovies.get(id);
        if (movie == null) throw new Error('No such a movie');
        return movie;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function createLovedMovie(
    userId: string,
    movieData: ISavedMovieSchema,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const sanitized = sanitizeSavedMovie(movieData);
        user.lovedMovies.set(String(movieData.id), sanitized);
        await user.save();
        return sanitized;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function createWatchedMovie(
    userId: string,
    movieData: ISavedMovieSchema,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const sanitized = sanitizeSavedMovie(movieData);
        user.watchedMovies.set(String(movieData.id), sanitized);
        await user.save();
        return sanitized;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function createToWatchMovie(
    userId: string,
    movieData: ISavedMovieSchema,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const sanitized = sanitizeSavedMovie(movieData);

        user.toWatchMovies.set(String(movieData.id), sanitized);
        await user.save();

        return sanitized;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function updateLovedMovie(
    userId: string,
    movieData: ISavedMovieSchema,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const sanitized = sanitizeSavedMovie(movieData);
        user.lovedMovies.set(String(movieData.id), sanitized);
        await user.save();
        return sanitized;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function updateWatchedMovie(
    userId: string,
    movieData: ISavedMovieSchema,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const sanitized = sanitizeSavedMovie(movieData);
        user.watchedMovies.set(String(movieData.id), sanitized);
        await user.save();
        return sanitized;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function updateToWatchMovie(
    userId: string,
    movieData: ISavedMovieSchema,
    model: Model<IUserSchema>
): Promise<ISavedMovieSchema> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        const sanitized = sanitizeSavedMovie(movieData);
        user.toWatchMovies.set(String(movieData.id), sanitized);
        await user.save();
        return sanitized;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function deelteLovedMovie(
    userId: string,
    id: string,
    model: Model<IUserSchema>
): Promise<void> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        user.lovedMovies.delete(id);
        await user.save();
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function deleteWatchedMovie(
    userId: string,
    id: string,
    model: Model<IUserSchema>
): Promise<void> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        user.watchedMovies.delete(id);
        await user.save();
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function deleteToWatchMovie(
    userId: string,
    id: string,
    model: Model<IUserSchema>
): Promise<void> {
    try {
        const user = await model.findById(userId);
        if (user == null) throw new Error('No such a user');
        user.toWatchMovies.delete(id);
        await user.save();
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function loginUser(
    email: string,
    password: string,
    model: Model<IUserSchema>
): Promise<IUserReturnType> {
    const sanitizedUser = await sanitizeLoginUser(email, password);

    try {
        const user = await model.findOne({ email });
        if (user == null) throw new HttpException('User not found', 404);
        const isPasswordValid = await bcrypt.compare(
            sanitizedUser.password,
            user.password
        );
        if (!isPasswordValid)
            throw new HttpException('Password is invalid', 401);

        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            access_token: generateToken({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            }),
        };
    } catch (err) {
        throw ErrorHandler(err);
    }
}
