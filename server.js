import express from 'express';
const app = express();
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
dotenv.config();

//routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//coudinary
import cloudinary from 'cloudinary';
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './public')));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.use('/api/v1/test', (req, res) => {
	res.json({ msg: 'test' });
});
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authenticateUser, userRouter);

//Not found route. Will trigger if there is no existing resource
app.use('*', (req, res) => {
	res.status(404).json({ msg: 'Not found here' });
});

//error route. Will get get triggered if there is an error in the code, or an error is thrown
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

try {
	await mongoose.connect(process.env.MONGO_URL);
	app.listen(port, () => {
		console.log(`server running on port ${port}`);
	});
} catch (err) {
	console.log(`${err}`);
	process.exit(1);
}
