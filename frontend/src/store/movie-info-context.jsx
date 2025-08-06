import { createContext, useState } from 'react';

import { getMovieData, searchMovie } from '../services/userService.js';

export const MovieContext = createContext({
	movieData: null,
	isLoading: true,
	onSearch: () => {},
	onClickCard: () => {},
});

export default function MovieContextProvider({ children }) {
	const [data, setData] = useState(null);

	function handleSearch(name) {
		setData(null);
		async function fetchData() {
			const updatedData = await searchMovie(name);
			setData(updatedData);
		}
		fetchData();
	}

	function handleGetMovieData(id) {
		setData(null);
		async function fetchData() {
			const updatedData = await getMovieData(id);
			setData(updatedData);
		}
		fetchData();
	}

	const movieContext = {
		movieData: data,
		isLoading: data === null,
		onSearch: handleSearch,
		onClickCard: handleGetMovieData,
	};

	return (
		<MovieContext.Provider value={movieContext}>
			{children}
		</MovieContext.Provider>
	);
}
