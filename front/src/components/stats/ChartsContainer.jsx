import { useState } from 'react';

import BarChartComponent from './BarChart';
import AreaCharts from './AreaChart';
import Wrapper from '../../assets/wrappers/ChartsContainer';

const ChartsContainer = ({ data }) => {
	const [barChart, setBarChart] = useState(true);
	return (
		<Wrapper>
			<h4>Monthly apps</h4>
			<button
				type="button"
				onClick={() => setBarChart(!barChart)}>
				{barChart ? 'Area chart' : 'Bar Chart'}
			</button>
			{barChart ? (
				<BarChartComponent data={data} />
			) : (
				<AreaCharts data={data} />
			)}
		</Wrapper>
	);
};

export default ChartsContainer;
