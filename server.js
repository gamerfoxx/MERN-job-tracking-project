import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

import mongoose from 'mongoose';

//routers
import jobRouter from './routes/jobRouter.js';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.post('/', (req, res) => {
	console.log(req);
	res.json({ message: 'res received', data: req.body });
});

app.use('/api/v1/jobs', jobRouter);

//Not found route. Will trigger if there is no existing resource
app.use('*', (req, res) => {
	res.status(404).json({ msg: 'Not found here' });
});

//error route. Will get get triggered if there is an error in the code, or an error is thrown
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ msg: 'Something broke. Try again' });
});

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

// app.listen(port, () => {});
