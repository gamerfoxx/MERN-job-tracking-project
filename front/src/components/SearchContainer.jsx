import { FormRow, FormRowSelect, SubmitButton } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobsPage';

const SearchContainer = () => {
	const { searchValues } = useAllJobsContext();
	const { search, jobStatus, jobType, sort } = searchValues;

	const submit = useSubmit();

	const debounce = (onChange) => {
		let timeout;
		return (e) => {
			const form = e.currentTarget.form;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				onChange(form);
			}, 2000);
		};
	};
	//debounce is used to set a timeout on each keystroke/change. Timeout is reset on each change, and the returned function will run after 2 seconds of no input
	return (
		<Wrapper>
			<Form className="form">
				<h5 className="form-title">Search Form</h5>
				<div className="form-center">
					<FormRow
						type="search"
						name="search"
						defaultValue={search}
						onChange={debounce((form) => {
							submit(form);
						})}
					/>
					<FormRowSelect
						label="Job Status"
						name="jobStatus"
						list={['all', ...Object.values(JOB_STATUS)]}
						defaultValue={jobStatus}
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
					/>
					<FormRowSelect
						label="Job Type"
						name="jobType"
						list={['all', ...Object.values(JOB_TYPE)]}
						defaultValue={jobType}
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
					/>
					<FormRowSelect
						label="sort"
						name="sort"
						list={[...Object.values(JOB_SORT_BY)]}
						defaultValue={sort}
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
					/>
					<Link
						to="/dashboard/all-jobs"
						className="btn form-btn delete-btn">
						Reset Search Values
					</Link>
					<SubmitButton formBtn />
				</div>
			</Form>
		</Wrapper>
	);
};

export default SearchContainer;
