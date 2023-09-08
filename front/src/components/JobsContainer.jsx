import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobsPage';
import PageButtonContainer from './PageButtonContainer';

const JobsContainer = () => {
	const { data } = useAllJobsContext();
	console.log(data);
	const { jobs, totalJobs, numOfPages } = data;
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No Jobs</h2>
			</Wrapper>
		);
	} else {
		return (
			<Wrapper>
				<h5>
					{totalJobs} jobs {totalJobs.length > 1 && 's'}
				</h5>
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
				{numOfPages > 1 && <PageButtonContainer />}
			</Wrapper>
		);
	}
};

export default JobsContainer;
