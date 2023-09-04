import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { createContext, useContext, useState } from 'react';

import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { BigSidebar, Navbar, SmallSidebar } from '../components/menus';
import { toast } from 'react-toastify';

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/user/currentuser');
		return data;
	} catch (err) {
		console.log(err);
		return redirect('/');
	}
};

const DashboardContext = createContext();

const DashboardLayout = () => {
	const { user } = useLoaderData();
	const navigate = useNavigate();

	const [showSidebar, setShowSidebar] = useState(true);
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

	function toggleIsDarkTheme() {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		document.body.classList.toggle('dark-theme', newDarkTheme);
		localStorage.setItem('darkTheme', newDarkTheme);
	}

	function toggleSidebar() {
		setShowSidebar(!showSidebar);
	}

	async function logoutUser() {
		navigate('/');
		await customFetch.get('/auth/logout');
		toast.success('Logging out');
	}
	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleSidebar,
				toggleIsDarkTheme,
				logoutUser,
			}}>
			<Wrapper>
				<main className="dashboard">
					<SmallSidebar />
					<BigSidebar />
					<div>
						<Navbar />
						<div className="dashboard-page">
							<Outlet context={{ user }} />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
