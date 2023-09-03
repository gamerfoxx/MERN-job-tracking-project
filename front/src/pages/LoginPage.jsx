import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, CustomButton } from '../components';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		await customFetch.post('/auth/login', data);
		toast.success('Login Successful');
		return redirect('/dashboard');
	} catch (err) {
		toast.error(err?.response?.data?.msg);
		console.log(err?.response?.data?.msg);
		return err;
	}
};

const LoginPage = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	return (
		<Wrapper>
			<Form
				method="post"
				className="form">
				<Logo />
				<h4>Login</h4>
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
				<CustomButton
					type="submit"
					disabled={isSubmitting}
					label={isSubmitting ? 'Logging in...' : 'Login'}
				/>
				<CustomButton
					type="button"
					label="Explore the app"
				/>
				<p>
					Not a user yet? <Link to="/register">Register</Link>
				</p>
			</Form>
		</Wrapper>
	);
};
export default LoginPage;
