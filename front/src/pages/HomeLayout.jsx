import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
	return (
		<>
			<Outlet />
			{/* Outlet used to dynamically display child pages through navigation */}
		</>
	);
};
export default HomeLayout;
