import { toast } from 'react-toastify';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';
import customFetch from '../utils/customFetch';
import { redirect, useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async ({ request }) => {
	//how to get the parameters for a query from the form using default method
	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries(),
	]);

	console.log(params);
	try {
		const { data } = await customFetch.get('/jobs', {
			params,
		});
		return { data, searchValues: { ...params } };
	} catch (err) {
		toast.error(err?.response?.data?.msg);
		console.log(err);
		return redirect('/');
	}
};

const AllJobsContext = createContext();

const AllJobsPage = () => {
	const { data, searchValues } = useLoaderData();
	return (
		<AllJobsContext.Provider value={{ data, searchValues }}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	);
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobsPage;
