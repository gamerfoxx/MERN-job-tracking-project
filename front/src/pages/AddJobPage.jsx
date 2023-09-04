import FormRow from '../components/FormRow';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { CustomButton } from '../components';
import FormRowSelect from '../components/FormRowSelection';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		await customFetch.post('/jobs', data);
		toast.success('Job Successfully Created');
		return redirect('all-jobs');
	} catch (err) {
		toast.error(err?.response?.data?.msg);
		console.log(err?.response?.data?.msg);
		return err;
	}
};

const AddJobPage = () => {
	const { user } = useOutletContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	return (
		<Wrapper>
			<Form
				method="post"
				className="form">
				<h4 className="form-title">add job</h4>
				<div className="form-center">
					<FormRow
						type="text"
						name="position"
					/>
					<FormRow
						type="text"
						name="company"
					/>
					<FormRow
						type="text"
						label="job location"
						name="jobLocation"
						default={user.location}
					/>
					<FormRowSelect
						labelText="job Status"
						name="jobStatus"
						list={Object.values(JOB_STATUS)}
						defaultValue={JOB_STATUS.PENDING}
					/>
					<FormRowSelect
						labelText="job type"
						name="jobType"
						list={Object.values(JOB_TYPE)}
						defaultValue={JOB_TYPE.FULL_TIME}
					/>
					<CustomButton
						type="submit"
						classes="form-btn"
						disabled={isSubmitting}
						label={isSubmitting ? 'is submitting' : 'submit'}
					/>
				</div>
			</Form>
		</Wrapper>
	);
};
export default AddJobPage;
