import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import { getTrendingData } from '../services/userService.js';
import Pagination from '../components/Pagination.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import MovieCard from '../components/MovieCard.jsx';
import NoMovieFound from '../components/NoMovieFound.jsx';

let pages = undefined;

export default function Home() {
	const navigate = useNavigate();
	const [trendingData, setTrendingData] = useState(null);
	const { page = 1 } = useParams();

	useEffect(() => {
		setTrendingData(null);
		async function fetchData() {
			const jsonData = await getTrendingData(page);
			pages = jsonData.total_pages;
			setTrendingData(() => {
				if (jsonData?.success === false) {
					navigate('/error');
					return null;
				} else return jsonData.results;
			});
		}
		fetchData();
	}, [page]);

	return (
		<>
			{trendingData === null && <LoadingSpinner />}
			{trendingData && trendingData.length === 0 && <NoMovieFound />}
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
						path='/trending'
					/>
				</>
			)}
		</>
	);
}
