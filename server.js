import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
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

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
