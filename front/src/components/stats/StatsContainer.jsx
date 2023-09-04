/* eslint-disable react/prop-types */
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/StatsContainer';
import StatItem from '../StatItem';

const StatsContainer = ({ defaultStats }) => {
	const stats = [
		{
			title: 'pending',
			count: defaultStats?.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: 'orange',
			bcg: '#fef3c7',
		},
		{
			title: 'interviews',
			count: defaultStats?.interview || 0,
			icon: <FaCalendarCheck />,
			color: 'blue',
			bcg: '#d3d3d3',
		},
		{
			title: 'declined',
			count: defaultStats?.pending || 0,
			icon: <FaBug />,
			color: 'red',
			bcg: '#855454',
		},
	];
	return (
		<Wrapper>
			{stats.map((item) => {
				return (
					<StatItem
						key={item.title}
						{...item}
					/>
				);
			})}
		</Wrapper>
	);
};

export default StatsContainer;
