import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobsPage';

const JobsContainer = () => {
	const { data } = useAllJobsContext();
	const { jobs } = data;
	console.log(data, jobs);
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No Jobs</h2>
			</Wrapper>
		);
	} else {
		return (
			<Wrapper>
				<div className="jobs">
					{jobs.map((job) => {
						return (
							<Job
								key={job.id}
								{...job}
							/>
						);
					})}
				</div>
			</Wrapper>
		);
	}
};

export default JobsContainer;
