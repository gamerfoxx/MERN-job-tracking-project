import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
	HomeLayout,
	LandingPage,
	RegisterPage,
	LoginPage,
	DashboardLayout,
	ErrorPage,
	AddJobPage,
	StatsPage,
	AllJobsPage,
	ProfilePage,
	AdminPage,
	EditJobPage,
} from './pages';
//router used imported from npm i react-router-dom
import { action as registerAction } from './pages/RegisterPage';
import { action as loginAction } from './pages/LoginPage';
import { action as addJobAction } from './pages/AddJobPage';
import { action as editJobAction } from './pages/EditJobPage';
import { action as deleteJobAction } from './pages/DeleteJobPage';
import { loader as editJobLoader } from './pages/EditJobPage';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allJobsLoader } from './pages/AllJobsPage';
import { loader as adminLoader } from './pages/AdminPage';

export const checkDefaultTheme = () => {
	const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
	document.body.classList.toggle('dark-theme', isDarkTheme);
	return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true, //Used to show the default content for the layout
				element: <LandingPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
				action: registerAction,
			},
			{
				path: 'login',
				element: <LoginPage />,
				action: loginAction,
			},
			{
				path: 'dashboard',
				element: <DashboardLayout />,
				loader: dashboardLoader,
				children: [
					{
						index: true, //Used to show the default content for the layout
						element: <AddJobPage />,
						action: addJobAction,
					},
					{
						path: 'stats',
						element: <StatsPage />,
					},
					{
						path: 'all-jobs',
						element: <AllJobsPage />,
						loader: allJobsLoader,
					},
					{
						path: 'profile',
						element: <ProfilePage />,
					},
					{
						path: 'admin',
						element: <AdminPage />,
						loader: adminLoader,
					},
					{
						path: 'edit-job/:id',
						element: <EditJobPage />,
						action: editJobAction,
						loader: editJobLoader,
					},
					{
						path: 'delete-job/:id',
						action: deleteJobAction,
					},
				],
			},
		],
	},

	{
		path: '/error',
		element: <ErrorPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
