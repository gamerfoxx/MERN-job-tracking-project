/* eslint-disable react/prop-types */
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Form, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import CustomButton from './CustomButton';
day.extend(advancedFormat);

const Job = ({
	_id,
	position,
	company,
	jobLocation,
	jobType,
	createdAt,
	jobStatus,
}) => {
	console.log(
		_id,
		position,
		company,
		jobLocation,
		jobType,
		createdAt,
		jobStatus
	);
	const date = day(createdAt).format('MMM dd, YYYY ');
	return (
		<Wrapper>
			<header>
				<div className="main-icon">{company.charAt(0)}</div>
				<div className="info">
					<h5>{position}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className="content">
				<div className="content-center">
					<JobInfo
						icon={<FaLocationArrow />}
						text={jobLocation}
					/>
					<JobInfo
						icon={<FaCalendarAlt />}
						text={date}
					/>
					<JobInfo
						icon={<FaBriefcase />}
						text={jobType}
					/>
					<div className={`status ${jobStatus}`}>{jobStatus}</div>
					<footer className="actions">
						<Link
							to={`../edit-job/${_id}`}
							className="btn edit-btn">
							Edit
						</Link>
						<Form>
							<CustomButton
								type="submit"
								classes="delete-btn"
								label="Delete"
							/>
						</Form>
					</footer>
				</div>
			</div>
		</Wrapper>
	);
};

export default Job;
