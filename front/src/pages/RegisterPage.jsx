import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import SubmitButton from '../components/SubmitButton';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		await customFetch.post('/auth/register', data);
		toast.success('Registration Successful');
		return redirect('/login');
	} catch (err) {
		toast.error(err?.response?.data?.msg);
		console.log(err?.response?.data?.msg);
		return err;
	}
};

const RegisterPage = () => {
	return (
		<Wrapper>
			<Form
				method="post"
				className="form">
				<Logo />
				<h4> Register</h4>
				<FormRow
					type="text"
					name="name"
					labelText="First Name"
				/>
				<FormRow
					type="text"
					name="lastName"
					labelText="Last Name"
				/>
				<FormRow
					type="text"
					name="location"
					labelText="Location"
				/>
				<FormRow
					type="email"
					name="email"
					labelText="Email"
				/>
				<FormRow
					type="password"
					name="password"
					labelText="password"
				/>
				<SubmitButton formBtn={true} />
				<p>
					Already a user?{' '}
					<Link
						to="/login"
						className="member-btn">
						Login
					</Link>
					{/* Must use a tag to create links to external sites */}
				</p>
			</Form>
		</Wrapper>
	);
};
export default RegisterPage;
