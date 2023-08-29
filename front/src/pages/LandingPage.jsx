import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Logo } from '../components';

import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						job <span>tracking </span> app
					</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. A
						pellentesque sit amet porttitor. Eu augue ut lectus arcu bibendum
						at. Ornare aenean euismod elementum nisi quis eleifend quam
						adipiscing. Sem nulla pharetra diam sit. At risus viverra adipiscing
						at. Sollicitudin ac orci phasellus egestas tellus. Vivamus at augue
						eget arcu dictum varius duis at consectetur. Nullam non nisi est sit
						amet facilisis magna etiam tempor. Est sit amet facilisis magna
						etiam. Massa eget egestas purus viverra accumsan in nisl nisi
						scelerisque. Ut tortor pretium viverra suspendisse potenti nullam ac
						tortor. Libero enim sed faucibus turpis. Montes nascetur ridiculus
						mus mauris vitae ultricies leo integer.
					</p>
					<Link
						to="/register"
						className="btn register-link">
						Register
					</Link>
					<Link
						to="/login"
						className="btn">
						Login / Demo User
					</Link>
				</div>
				<img
					src={main}
					className="img main-img"
				/>
			</div>
		</Wrapper>
	);
};
export default LandingPage;
