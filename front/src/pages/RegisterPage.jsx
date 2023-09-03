import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, CustomButton } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

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
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
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
					defaultValue="Joey"
				/>
				<FormRow
					type="text"
					name="lastName"
					labelText="Last Name"
					defaultValue="L"
				/>
				<FormRow
					type="text"
					name="location"
					labelText="Location"
					defaultValue="Here"
				/>
				<FormRow
					type="email"
					name="email"
					labelText="Email"
					defaultValue="test@test.com"
				/>
				<FormRow
					type="password"
					name="password"
					labelText="password"
					defaultValue="password"
				/>
				<FormRow
					type="password"
					name="password"
					labelText="Re-enter Password"
					defaultValue="password"
				/>
				<CustomButton
					type="submit"
					disabled={isSubmitting}
					label={isSubmitting ? 'Submitting...' : 'Submit'}
				/>
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
