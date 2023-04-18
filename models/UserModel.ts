import { model } from 'mongoose';
import userSchema, { type IUserSchema } from '../schemas/UserSchema';

const User = model<IUserSchema>('User', userSchema);

export default User;
