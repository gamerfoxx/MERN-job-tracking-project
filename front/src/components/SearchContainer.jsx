import { FormRow, FormRowSelect, SubmitButton } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobsPage';

const SearchContainer = () => {
	const { searchValues } = useAllJobsContext();
	const { search, jobStatus, jobType, sort } = searchValues;

	const submit = useSubmit();
	return (
		<Wrapper>
			<Form className="form">
				<h5 className="form-title">Search Form</h5>
				<div className="form-center">
					<FormRow
						type="search"
						name="search"
						defaultValue={search}
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
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
