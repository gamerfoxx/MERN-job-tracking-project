import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, CustomButton } from '../components';
import { Form, redirect, Link, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import SubmitButton from '../components/SubmitButton';

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
	const navigate = useNavigate();
	const loginDemoUser = async () => {
		const data = { email: 'guest@guest.com', password: 'guestguest' };
		try {
			await customFetch.post('/auth/login', data);
			toast.success('Feel free to look around');
			return navigate('/dashboard');
		} catch (err) {
			toast.error(err?.response?.data?.msg);
			return err;
		}
	};
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
				/>
				<FormRow
					type="password"
					name="password"
					labelText="password"
				/>
				<SubmitButton formBtn={true} />
				<CustomButton
					type="button"
					label="Explore the app"
					onClick={loginDemoUser}
				/>
				<p>
					Not a user yet? <Link to="/register">Register</Link>
				</p>
			</Form>
		</Wrapper>
	);
};
export default LoginPage;
