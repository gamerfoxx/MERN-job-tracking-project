import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import StatItem from '../components/StatItem';

export const loader = async () => {
	try {
		const response = await customFetch.get('user/admin/appstats');
		return response.data;
	} catch (err) {
		toast.error('Not authorized ');
		return redirect('/dashboard');
	}
};

const AdminPage = () => {
	const { users, jobs } = useLoaderData();
	return (
		<Wrapper>
			<StatItem
				title="Current users"
				count={users}
				color="red"
				bcg="blue"
				icon={<FaSuitcaseRolling />}
			/>
			<StatItem
				title="total jobs"
				count={jobs}
				color="red"
				bcg="blue"
				icon={<FaCalendarCheck />}
			/>
		</Wrapper>
	);
};
export default AdminPage;
