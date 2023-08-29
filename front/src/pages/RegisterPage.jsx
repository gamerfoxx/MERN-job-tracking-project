import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, CustomButton } from '../components';

const RegisterPage = () => {
	return (
		<Wrapper>
			<form className="form">
				<Logo />
				<h4> Register</h4>
				<FormRow
					type="text"
					name="firstName"
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
				<CustomButton type="submit" />
				<p>
					Already a user?{' '}
					<Link
						to="/login"
						className="member-btn">
						Login
					</Link>
					{/* Must use a tag to create links to external sites */}
				</p>
			</form>
		</Wrapper>
	);
};
export default RegisterPage;
