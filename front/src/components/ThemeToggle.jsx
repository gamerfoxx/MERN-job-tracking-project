import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

export const ThemeToggle = () => {
	const { isDarkTheme, toggleIsDarkTheme } = useDashboardContext();
	return (
		<Wrapper onClick={toggleIsDarkTheme}>
			{isDarkTheme ? (
				<BsFillSunFill className="toggle-icon" />
			) : (
				<BsFillMoonFill />
			)}
		</Wrapper>
	);
};
