import mongoose from 'mongoose';

const JobScema = new mongoose.Schema(
	{
		comapny: String,
		position: String,
		jobStatus: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		jobType: {
			type: String,
			enum: ['full-time', 'part-time', 'intern'],
			default: 'full-time',
		},
		jobLocation: {
			type: String,
			default: 'my city',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Job', JobScema);
