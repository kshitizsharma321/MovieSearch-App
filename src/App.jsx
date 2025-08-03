import { useRef, useState, useEffect, useContext } from 'react';

import SearchBar from './components/SearchBar.jsx';
import MovieCard from './components/MovieCard.jsx';
import { SearchContext } from './store/movie-info-context.jsx';
import './App.css';

export default function App() {
	const { apiKey, onSearch } = useContext(SearchContext);
	const [data, setData] = useState(null);
	const inputRef = useRef();

	useEffect(() => {
		async function fetchData() {
			const updatedData = await onSearch(`trending/all/day?${apiKey}`);
			setData(updatedData.results);
		}
		fetchData();
	}, []);

	function handleInput() {
		let userInput = inputRef.current.value;
		userInput = userInput.trim();
		if (!userInput) {
			inputRef.current.value = userInput;
			inputRef.current.blur();
			return;
		}
		setData(null);
		async function fetchData() {
			const updatedData = await onSearch(
				`search/multi?${apiKey}&query=${userInput}`
			);
			setData(updatedData.results);
		}
		fetchData();
		inputRef.current.value = userInput;
		inputRef.current.blur();
	}

	let content = (
		<div className='loading'>
			<div className='spinner'></div>
			<p>Searching movies...</p>
		</div>
	);
	if (data) {
		if (data.length === 0) {
			content = (
				<div className='no-results-simple'>
					<h3>No Movies Found!</h3>
					<p>Try different search terms</p>
				</div>
			);
		} else {
			content = (
				<div className='movies-grid'>
					{data.map((individualData) => (
						<MovieCard
							key={individualData.id}
							individualData={individualData}
						/>
					))}
				</div>
			);
		}
	}

	return (
		<div className='app'>
			<div className='app-container'>
				<div className='search-section'>
					<h1 className='app-title'>BingeBuzz</h1>
					<SearchBar ref={inputRef} onInput={handleInput} />
				</div>

				<div className='content-section'>{content}</div>
			</div>
		</div>
	);
}
