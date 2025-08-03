import { createContext } from 'react';

const API_KEY = `api_key=${import.meta.env.VITE_API_KEY}`;
const TMDB = `https://api.themoviedb.org/3`;

async function getData(searchURL) {
	const result = await fetch(`${TMDB}/${searchURL}`);
	const response = await result.json();
	return response;
}

export const SearchContext = createContext({
	apiKey: API_KEY,
	onSearch: getData,
});
