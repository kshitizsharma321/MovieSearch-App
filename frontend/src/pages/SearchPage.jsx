import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';

import { getSearchData } from '../services/userService.js';
import SearchBar from '../components/SearchBar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import NoMovieFound from '../components/NoMovieFound.jsx';
import MovieCard from '../components/MovieCard.jsx';

const URL = import.meta.env.VITE_URL;

export default function SearchPage() {
	const [searchData, setSearchData] = useState(null);
	const [searchQuery] = useSearchParams();
	const name = searchQuery.get('q');

	useEffect(() => {
		setSearchData(null);
		async function fetchData() {
			const jsonData = getSearchData(name);
			setSearchData(jsonData);
		}
		fetchData();
	}, [name]);

	return (
		<>
			<div className='search-section'>
				<h1 className='app-title'>{name}</h1>
				<SearchBar />
			</div>
			{searchData === null && <LoadingSpinner />}
			{searchData && searchData.length === 0 && <NoMovieFound />}
			{searchData && searchData.length > 0 && (
				<div className='movies-grid'>
					{searchData.map((individualData) => (
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
