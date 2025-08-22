import { useCallback, useEffect, useState } from 'react';

import { getSearchData } from './userService.js';

export function useDebouncedSearch(userInput, media) {
	const [debouncedQuery, setDebouncedQuery] = useState('');
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	// let justSelected = useRef(false);

	const clearSuggestions = useCallback(() => {
		// justSelected.current = true;
		setFilteredSuggestions([]);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(userInput);
			// if (!justSelected.current) setDebouncedQuery(userInput);
			// else justSelected.current = false;
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [userInput]);

	useEffect(() => {
		if (debouncedQuery && debouncedQuery.trim()) {
			async function fetchData() {
				const jsonData = await getSearchData(media, debouncedQuery, 1);
				setFilteredSuggestions(
					() =>
						jsonData.results
							?.slice(0, 5)
							.map((data) => data.title || data.name) || []
				);
			}
			fetchData();
		} else setFilteredSuggestions([]);
	}, [debouncedQuery, media]);

	return { filteredSuggestions, clearSuggestions };
}
