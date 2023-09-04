import ChartsContainer from '../components/stats/ChartsContainer';
import StatsContainer from '../components/stats/StatsContainer';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
export const loader = async () => {
	try {
		const response = await customFetch.get('/jobs/stats');
		return response.data;
	} catch (error) {
		return error;
	}
};

const StatsPage = () => {
	const { defaultStats, monthlyApps } = useLoaderData();
	return (
		<>
			<StatsContainer defaultStats={defaultStats} />
			{monthlyApps?.length > 1 && <ChartsContainer data={monthlyApps} />}
		</>
	);
};
export default StatsPage;
