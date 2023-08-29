import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);
	if (error.status === 404) {
		return (
			<Wrapper>
				<div>
					<img src={img} />
					<p>Page Not found!</p>
					<p>
						<b>{error.status}</b> {error.data}
					</p>
					<Link to="/">Home</Link>
				</div>
			</Wrapper>
		);
	}
	return (
		<Wrapper>
			<p>
				<b>{error.status}</b> {error.data}
			</p>
			<Link to="/">Home</Link>
		</Wrapper>
	);
};
export default ErrorPage;
