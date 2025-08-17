import { useState, useEffect } from 'react';

import { getSearchData } from '../services/userService.js';
import { useQueryParams } from '../services/useQueryParams.jsx';
import Pagination from '../components/Pagination.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import MovieCard from '../components/MovieCard.jsx';
import NoMovieFound from '../components/NoMovieFound.jsx';
import SearchBar from '../components/SearchBar.jsx';

let pages = undefined;

export default function SearchPage() {
	const [searchData, setSearchData] = useState(null);
	const { navigate, name, media, page } = useQueryParams();

	useEffect(() => {
		setSearchData(null);
		async function fetchData() {
			const jsonData = await getSearchData(media, name, page);
			pages = jsonData.total_pages;
			setSearchData(() => {
				if (jsonData?.success === false) {
					navigate('/error');
					return null;
				} else return jsonData.results;
			});
		}
		fetchData();
	}, [media, name, page]);

	return (
		<>
			<SearchBar />
			{searchData === null && <LoadingSpinner />}
			{searchData && searchData.length === 0 && <NoMovieFound media={media} />}
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
						path={`/search?q=${name}&type=${media}`}
					/>
				</>
			)}
		</>
	);
}
