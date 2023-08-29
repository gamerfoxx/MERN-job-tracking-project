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

//get all jobs
app.get('/api/v1/jobs', (req, res) => {
	res.status(200).json({ jobs });
});

//create jobs
app.post('/api/v1/jobs', (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		res.status(400).json({ msg: 'Please provide valid company and position' });
		return;
	}
	const id = nanoid(10);
	const job = { id, company, position };
	jobs.push(job);
	res.status(201).json({ job });
});

//get one job
app.get('/api/v1/jobs/:id', (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		res.status(404).json({ msg: 'Please provide valid ID' });
		return;
	}
	res.status(200).json({ job });
});

//edit job
app.patch('/api/v1/jobs/:id', (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		res.status(400).json({ msg: 'Please provide valid company and position' });
		return;
	}
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		res.status(404).json({ msg: 'Please provide valid ID' });
		return;
	}
	job.company = company;
	job.position = position;
	res.status(200).json({ msg: 'job modified', job });
});

//delete job
app.delete('/api/v1/jobs/:id', (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		res.status(404).json({ msg: 'Please provide valid ID' });
		return;
	}
	const newJobs = jobs.filter((job) => job.id !== id);
	jobs = newJobs;
	res.status(200).json({ msg: 'job deleted' });
});

//Not found route. Will trigger if there is no existing resource
app.use('*', (req, res) => {
	res.status(404).json({ msg: 'Not found here' });
});

//error route. Will get get triggered if there is an error in the code
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ msg: 'Something broke. Try again' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
