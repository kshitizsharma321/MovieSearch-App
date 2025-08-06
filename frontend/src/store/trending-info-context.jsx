import { createContext, useEffect, useState } from 'react';

import { getTrendingData } from '../services/userService.js';

export const TrendingContext = createContext({
	movieData: null,
	isLoading: true,
});

export default function TrendingContextProvider({ children }) {
	const [trendingData, setTrendingData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const result = await getTrendingData();
			setTrendingData(result);
		}
		fetchData();
	}, []);

	const trendingContext = {
		movieData: trendingData,
		isLoading: trendingData === null,
	};

	return (
		<TrendingContext.Provider value={trendingContext}>
			{children}
		</TrendingContext.Provider>
	);
}
