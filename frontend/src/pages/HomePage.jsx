import { useEffect, useState } from 'react';

import { getTrendingData } from '../services/userService.js';
import { useQueryParams } from '../services/useQueryParams.jsx';
import Pagination from '../components/Pagination.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import MovieCard from '../components/MovieCard.jsx';
import NoMovieFound from '../components/NoMovieFound.jsx';
import SearchBar from '../components/SearchBar.jsx';

let pages = undefined;

export default function Home() {
	const [trendingData, setTrendingData] = useState(null);
	const { navigate, media, page } = useQueryParams();

	useEffect(() => {
		setTrendingData(null);
		async function fetchData() {
			const jsonData = await getTrendingData(media, page);
			pages = jsonData.total_pages;
			setTrendingData(() => {
				if (jsonData?.success === false) {
					navigate('/error');
					return null;
				} else return jsonData.results;
			});
		}
		fetchData();
	}, [media, page]);

	return (
		<>
			<SearchBar />
			{trendingData === null && <LoadingSpinner />}
			{trendingData && trendingData.length === 0 && (
				<NoMovieFound media={media} />
			)}
			{trendingData && trendingData.length > 0 && (
				<>
					<div className='movies-grid'>
						{trendingData.map((individualData) => (
							<MovieCard
								key={individualData.id}
								individualData={individualData}
							/>
						))}
					</div>
					<Pagination
						page={parseInt(page)}
						pages={parseInt(pages)}
						path={`/trending?type=${media}`}
					/>
				</>
			)}
		</>
	);
}
