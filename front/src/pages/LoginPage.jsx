import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, CustomButton } from '../components';

const LoginPage = () => {
	return (
		<Wrapper>
			<form className="form">
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
				<CustomButton type="submit" />
				<CustomButton
					type="button"
					label="Explore the app"
				/>
				<p>
					Not a user yet? <Link to="/register">Register</Link>
				</p>
			</form>
		</Wrapper>
	);
};
export default LoginPage;
