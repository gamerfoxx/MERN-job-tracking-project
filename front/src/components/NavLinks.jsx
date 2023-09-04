import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const NavLinks = ({ isLarge }) => {
	const { toggleSidebar, user } = useDashboardContext();
	return (
		<div className="nav-links">
			{links.map((link) => {
				const { text, path, icon } = link;
				const { role } = user;
				if (path === 'admin' && role !== 'admin') return;
				return (
					<NavLink
						to={path}
						key={text}
						className="nav-link"
						onClick={isLarge ? null : toggleSidebar}
						end>
						<span className="icon">{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};
