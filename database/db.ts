import mongoose from 'mongoose';
import HttpException from '../middleware/ErrorMiddleware';
import { MONGO_URI } from '../utils/config';

console.log(MONGO_URI);

export const connectDB = async (): Promise<void> => {
    if (MONGO_URI === '' || MONGO_URI === null) {
        console.log(
            '-----------------\nUrl for mongo not defined\n-----------------\n'
                .red.underline
        );
        process.exit(1);
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log(
            '-----------------\nMongoDB connected\n-----------------\n'.blue
                .underline.bold
        );
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};
export function checkIsValidObjectId(id: string): void {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException(`${id} is not a valid id`, 400);
    }
}
