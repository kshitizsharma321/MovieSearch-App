import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import { getSearchData } from '../services/userService.js';
import Pagination from '../components/Pagination.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import MovieCard from '../components/MovieCard.jsx';
import NoMovieFound from '../components/NoMovieFound.jsx';

let pages = undefined;

export default function SearchPage() {
	const navigate = useNavigate();
	const [searchData, setSearchData] = useState(null);
	const { name, page = 1 } = useParams();

	useEffect(() => {
		setSearchData(null);
		async function fetchData() {
			const jsonData = await getSearchData(name, page);
			pages = jsonData.total_pages;
			setSearchData(() => {
				if (jsonData?.success === false) {
					navigate('/error');
					return null;
				} else return jsonData.results;
			});
		}
		fetchData();
	}, [name, page]);

	return (
		<>
			{searchData === null && <LoadingSpinner />}
			{searchData && searchData.length === 0 && <NoMovieFound />}
			{searchData && searchData.length > 0 && (
				<>
					<div className='movies-grid'>
						{searchData.map((individualData) => (
							<MovieCard
								key={individualData.id}
								individualData={individualData}
							/>
						))}
					</div>
					<Pagination
						page={parseInt(page)}
						pages={parseInt(pages)}
						path={`/search/${name}`}
					/>
				</>
			)}
		</>
	);
}
