import { Schema } from 'mongoose';
import type IUser from '../types/UserTypes';
// eslint-disable-next-line no-useless-escape
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface IUserSchema extends IUser {
    _id: string;
}
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Username is requried'],
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is requried'],
            min: [6, 'Email must be at least 6 characters'],
            max: [50, 'Email must be less then 50 characters'],
            match: [emailRegex, 'Please add a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            min: [6, 'Password must be at least 6 characters'],
            max: [50, 'Password must be less then 50 characters'],
        },
        poster_path: {
            type: String,
            required: true,
            default:
                'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },

        lovedMovies: {
            type: Map,
            of: {
                title: {
                    type: String,
                    required: [true, 'Cannot save namesless movie'],
                },
                overview: {
                    type: String,
                    required: [true, 'Movie with no description'],
                },
                poster_path: {
                    type: String,
                    required: [true, 'Movie with no poster_path'],
                },
                vote_average: { type: Number, required: true },
                id: { type: String, required: true },
                vote_count: { type: Number },
                release_date: { type: String },
            },
        },
        watchedMovies: {
            type: Map,
            of: {
                title: {
                    type: String,
                    required: [true, 'Cannot save namesless movie'],
                },
                overview: {
                    type: String,
                    required: [true, 'Movie with no description'],
                },
                poster_path: {
                    type: String,
                    required: [true, 'Movie with no poster_path'],
                },
                vote_average: { type: Number },
                id: { type: String, required: true },
                vote_count: { type: Number },
                release_date: { type: String },
            },
        },
        toWatchMovies: {
            type: Map,
            of: {
                title: {
                    type: String,
                    required: [true, 'Cannot save namesless movie'],
                },
                overview: {
                    type: String,
                    required: [true, 'Movie with no description'],
                },
                poster_path: {
                    type: String,
                    required: [true, 'Movie with no poster_path'],
                },
                vote_average: { type: Number },
                id: { type: String, required: true },
                vote_count: { type: Number },
                release_date: { type: String },
            },
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    { timestamps: true }
);

export default userSchema;
