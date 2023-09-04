import { toast } from 'react-toastify';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';
import customFetch from '../utils/customFetch';
import { redirect, useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/jobs');
		console.log(data);
		return { data };
	} catch (err) {
		toast.error(err?.response?.data?.msg);
		console.log(err);
		return redirect('/');
	}
};

const AllJobsContext = createContext();

const AllJobsPage = () => {
	const { data } = useLoaderData();
	return (
		<AllJobsContext.Provider value={{ data }}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	);
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobsPage;
