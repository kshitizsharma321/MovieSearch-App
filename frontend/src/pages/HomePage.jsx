import { useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import NoMovieFound from '../components/NoMovieFound.jsx';
import MovieCard from '../components/MovieCard.jsx';

const URL = import.meta.env.VITE_URL;

export default function Home() {
	const [trendingData, setTrendingData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`${URL}/api`);
			const jsonData = await response.json();
			setTrendingData(jsonData);
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
