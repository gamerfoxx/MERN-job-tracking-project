import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

let jobs = [
	{ id: nanoid(), company: 'google', position: 'frontend' },
	{ id: nanoid(), company: 'apple', position: 'frontend' },
	{ id: nanoid(), company: 'android', position: 'frontend' },
];

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

app.get('/api/v1/jobs', (req, res) => {
	res.status(200).json({ jobs });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
