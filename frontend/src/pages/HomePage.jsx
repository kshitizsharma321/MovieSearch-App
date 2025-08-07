import { useEffect, useState } from 'react';

import { getTrendingData } from '../services/userService.js';
import SearchBar from '../components/SearchBar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import NoMovieFound from '../components/NoMovieFound.jsx';
import MovieCard from '../components/MovieCard.jsx';

export default function Home() {
	const [trendingData, setTrendingData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const result = await getTrendingData();
			setTrendingData(result);
		}
		fetchData();
	}, []);

	return (
		<>
			<div className='search-section'>
				<h1 className='app-title'>BingeBuzz</h1>
				<SearchBar />
			</div>
			{trendingData === null && <LoadingSpinner />}
			{trendingData && trendingData.length === 0 && <NoMovieFound />}
			{trendingData && trendingData.length > 0 && (
				<div className='movies-grid'>
					{trendingData.map((individualData) => (
						<MovieCard
							key={individualData.id}
							individualData={individualData}
						/>
					))}
				</div>
			)}
		</>
	);
}
